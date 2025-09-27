import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
}

export default function ChatPanel({ hasSources, sourceCount, messages, onSendMessage, status }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [isChatMode, setIsChatMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status !== 'in_progress') {
      onSendMessage(input);
      setInput('');
      setIsChatMode(true); // Switch to chat mode when user sends first message
    }
  };

  const handleQuickQuestion = (question: string) => {
    onSendMessage(question);
    setIsChatMode(true);
  };
  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {!hasSources ? (
          <EmptyState />
        ) : isChatMode ? (
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
      {hasSources && (
        <div className="border-t p-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Start typing..."
                  className="pr-20 py-3"
                  disabled={status === 'in_progress'}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{sourceCount} source{sourceCount > 1 ? 's' : ''}</span>
                  <Button 
                    type="submit" 
                    size="sm"
                    disabled={!input.trim() || status === 'in_progress'}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </form>
            
            {/* Suggested Questions - Only show when not in chat mode */}
            {!isChatMode && (
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
      )}
    </div>
  );
}
