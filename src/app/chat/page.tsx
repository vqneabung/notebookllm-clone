"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import SourcesPanel from "@/components/SourcesPanel";
import ChatPanel from "@/components/ChatPanel";
import FlashcardPanel from "@/components/FlashcardPanel";

interface Source {
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
  const [sources, setSources] = useState<Source[]>([
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
    setUploadProgress(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}...`);
    setUploadPercentage(5);
    
    try {
      // Add sources to UI immediately with processing state
      const newSources = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        title: file.name,
        checked: true,
      }));
      setSources((prev) => [...prev, ...newSources]);

      // Upload and process files
      await handleUpload(files);
      
      setUploadProgress('Files processed successfully!');
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
    setUploadPercentage(15);
    
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    setUploadProgress('Converting PDF to text...');
    setUploadPercentage(35);
    
    const resp = await fetch("/api/file/upload", {
      method: "POST",
      body: formData,
    });
    
    if (!resp.ok) {
      const errorData = await resp.json();
      throw new Error(errorData.message || 'Upload failed');
    }

    setUploadProgress('Creating embeddings...');
    setUploadPercentage(70);
    const data = await resp.json();
    
    setUploadProgress('Finalizing...');
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
      <FlashcardPanel />
    </div>
  );
}
