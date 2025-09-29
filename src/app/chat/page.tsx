"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import SourcesPanel from "@/components/SourcesPanel";
import ChatPanel from "@/components/ChatPanel";
import FlashcardPanel from "@/components/FlashcardPanel";
import useStateRef from "react-usestateref";

export interface Source {
  id: string;
  title: string;
  checked: boolean;
}

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  // State for sources
  const [sources, setSources] = useStateRef<Source[]>([
    // For demo purposes, you can uncomment the line below to show content with sources
  ]);

  // Upload states
  const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleSendMessage = (message: string) => {
    sendMessage({ text: message });
  };

  const handleToggleSource = (id: string) => {
    setSources((prev) =>
      prev.map((source) =>
        source.id === id ? { ...source, checked: !source.checked } : source
      )
    );
  };

  const handleToggleAll = () => {
    const allChecked = sources.every((source) => source.checked);
    setSources((prev) =>
      prev.map((source) => ({ ...source, checked: !allChecked }))
    );
  };

  const handleAddSources = async (files: File[]) => {
    setIsUploading(true);
    setUploadProgress(`Processing ${files.length} file${files.length > 1 ? 's' : ''}...`);
    setUploadPercentage(5);
    
    try {
      // Upload and process files first
      const data = await handleUpload(files);

      // After successful upload, add sources to UI
      setUploadProgress('Adding sources to interface...');
      setUploadPercentage(95);
      
      const newSources = data.resourceIds.map((id: string, index: number) => ({
        id: data.resourceIds[index],
        title: data.fileName[index],
        checked: true,
      }));

      console.log('New sources added:', newSources);
      setSources((prev) => [...prev, ...newSources]);
      
      setUploadProgress('Complete!');
      setUploadPercentage(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress('');
        setUploadPercentage(0);
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress('Upload failed. Please try again.');
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress('');
        setUploadPercentage(0);
      }, 2000);
    }
  };

  const handleUpload = async (files: File[]) => {
    setUploadProgress('Preparing files...');
    setUploadPercentage(10);
    
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    setUploadProgress('Uploading files...');
    setUploadPercentage(25);
    
    const resp = await fetch("/api/file/upload", {
      method: "POST",
      body: formData,
    });
    
    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || 'Upload failed');
    }

    const data = await resp.json();
    
    setUploadProgress('Processing complete...');
    setUploadPercentage(90);
    
    console.log('Upload successful:', data);
    
    return data;
  };

  const allChecked = sources.every((source) => source.checked);
  const hasSources = sources.length > 0;
  const sourceCount = sources.filter((source) => source.checked).length;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sources Panel */}
      <SourcesPanel
        sources={sources}
        onToggleSource={handleToggleSource}
        onToggleAll={handleToggleAll}
        allChecked={allChecked}
        onAddSources={handleAddSources}
      />

      {/* Chat Panel */}
      <ChatPanel
        hasSources={hasSources}
        sourceCount={sourceCount}
        messages={messages}
        onSendMessage={handleSendMessage}
        status={status}
        onAddSources={handleAddSources}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        uploadPercentage={uploadPercentage}
      />

      {/* Flashcard Panel */}
      <FlashcardPanel sources={sources} />
    </div>
  );
}
