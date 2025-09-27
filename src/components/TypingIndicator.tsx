import { Card } from '@/components/ui/card';

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <Card className="bg-muted text-muted-foreground px-4 py-3 max-w-[70%] shadow-sm">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-xs ml-2">AI is typing...</span>
        </div>
      </Card>
    </div>
  );
}
