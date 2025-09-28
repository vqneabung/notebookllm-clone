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

  const handleAddSources = (files: File[]) => {
    const newSources = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      title: file.name,
      checked: true,
    }));
    handleUpload(files);
    setSources((prev) => [...prev, ...newSources]);
  };

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const resp = await fetch("/api/file/upload", {
      method: "POST",
      body: formData,
    });
    const data = await resp.json();
    console.log(data);
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
      />

      {/* Flashcard Panel */}
      <FlashcardPanel />
    </div>
  );
}
