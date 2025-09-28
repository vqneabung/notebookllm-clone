import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Send } from 'lucide-react';
import { UIMessage } from '@ai-sdk/react';
import { useState } from 'react';
import ChatContent from './ChatContent';
import EmptyState from './EmptyState';
import ChatMessages from './ChatMessages';

interface ChatPanelProps {
  hasSources: boolean;
  sourceCount: number;
  messages: UIMessage[];
  onSendMessage: (message: string) => void;
  status: string;
  onAddSources: (files: File[]) => void;
  isUploading?: boolean;
  uploadProgress?: string;
  uploadPercentage?: number;
}

export default function ChatPanel({ hasSources, sourceCount, messages, onSendMessage, status, onAddSources, isUploading = false, uploadProgress = '', uploadPercentage = 0 }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [isChatMode, setIsChatMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status !== 'streaming' && !isUploading) {
      onSendMessage(input);
      setInput('');
      setIsChatMode(true); // Switch to chat mode when user sends first message
    }
  };

  const handleQuickQuestion = (question: string) => {
    if (!isUploading) {
      onSendMessage(question);
      setIsChatMode(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      {/* Main Content */}
      {!hasSources ? (
        <EmptyState 
          onAddSources={onAddSources} 
          isUploading={isUploading}
          uploadProgress={uploadProgress}
          uploadPercentage={uploadPercentage}
        />
      ) : (
        <>
          <div className="flex-1 min-h-0 overflow-hidden">
            {isChatMode ? (
              <ChatMessages messages={messages} status={status} />
            ) : (
              <ChatContent
                title="Triết học: Chủ nghĩa Duy vật Biện chứng"
                sourceCount={sourceCount}
                description="This collection of excerpts originates from a coursebook on Marxist-Leninist Philosophy published in Hanoi in 2021 by the National Political Truth Publishing House, under the direction of the Ministry of Education and Training. The text, intended for non-specialised university political theory students, outlines the core principles of this ideology, focusing on dialectical materialism. Key themes discussed include the fundamental problems of philosophy, such as the relationship between matter and consciousness, different philosophical schools like materialism and idealism, and the nature of matter and consciousness itself. The material also covers the role of Marxist-Leninist theory as a scientific worldview and revolutionary methodology, applying its principles to social and historical development."
              />
            )}
          </div>

          {/* Chat Input - Only show when has sources */}
          <div className="border-t p-4 flex-shrink-0">
            <div className="max-w-4xl mx-auto">
              {/* Upload Progress Indicator */}
              {isUploading && (
                <div className="mb-4 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{uploadProgress}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{uploadPercentage}%</span>
                  </div>
                  <Progress value={uploadPercentage} className="h-2" />
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isUploading ? "Processing files..." : "Start typing..."}
                    className="pr-20 py-3"
                    disabled={status === 'in_progress' || isUploading}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{sourceCount} source{sourceCount > 1 ? 's' : ''}</span>
                    <Button 
                      type="submit" 
                      size="sm"
                      disabled={!input.trim() || status === 'in_progress' || isUploading}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </form>
              
              {/* Suggested Questions - Only show when not in chat mode and not uploading */}
              {!isChatMode && !isUploading && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="whitespace-nowrap text-xs"
                    onClick={() => handleQuickQuestion("How does dialectical materialism uniquely define the relationship between matter and consciousness?")}
                  >
                    How does dialectical materialism uniquely define the relationship between matter and consciousness?
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="whitespace-nowrap text-xs"
                    onClick={() => handleQuickQuestion("What historical context shaped the development of Marxist-Leninist philosophy?")}
                  >
                    What historical context shaped the development of Marxist-Leninist philosophy?
                  </Button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
