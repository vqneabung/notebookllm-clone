import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, Copy, Wand2, Brain } from 'lucide-react';

interface ChatContentProps {
  title: string;
  sourceCount: number;
  description: string;
}

export default function ChatContent({ title, sourceCount, description }: ChatContentProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-full">
      {/* Icon */}
      <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
        <Brain className="w-8 h-8 text-purple-600" />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-2 text-center">
        {title}
      </h1>
      
      <p className="text-sm text-muted-foreground mb-8">{sourceCount} source{sourceCount > 1 ? 's' : ''}</p>

      {/* Description */}
      <div className="max-w-2xl text-sm text-muted-foreground leading-relaxed mb-8 text-center">
        <p>{description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8">
        <Button variant="outline" size="sm">
          <BookmarkPlus className="w-4 h-4 mr-2" />
          Save to note
        </Button>
        <Button variant="outline" size="sm">
          <Copy className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3 mb-8">
        <Button variant="outline" className="bg-orange-50 hover:bg-orange-100 border-orange-200">
          <BookmarkPlus className="w-4 h-4 mr-2" />
          Add note
        </Button>
        <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 border-blue-200">
          <Wand2 className="w-4 h-4 mr-2" />
          Audio Overview
        </Button>
        <Button variant="outline" className="bg-pink-50 hover:bg-pink-100 border-pink-200">
          <Brain className="w-4 h-4 mr-2" />
          Mind map
        </Button>
      </div>
      </div>
    </div>
  );
}
