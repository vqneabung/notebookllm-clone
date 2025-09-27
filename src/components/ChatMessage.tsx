import { UIMessage } from '@ai-sdk/react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: UIMessage;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={cn("flex w-full mb-4", isUser ? "justify-end" : "justify-start")}>
      <Card
        className={cn(
          "max-w-[70%] px-4 py-3 shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground ml-auto"
            : "bg-muted text-muted-foreground mr-auto"
        )}
      >
        <div className="whitespace-pre-wrap text-sm">
          {message.parts.map((part: any, index: number) =>
            part.type === 'text' ? (
              <span key={index}>{part.text}</span>
            ) : null
          )}
        </div>
      </Card>
    </div>
  );
}
