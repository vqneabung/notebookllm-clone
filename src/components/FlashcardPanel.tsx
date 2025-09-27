import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, BookOpen, CreditCard } from 'lucide-react';

export default function FlashcardPanel() {
  return (
    <div className="w-80 bg-background border-l flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Flashcard</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 hover:bg-muted cursor-pointer">
            <div className="flex flex-col items-center text-center space-y-2">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium">Study Overview</span>
            </div>
          </Card>
          
          <Card className="p-4 hover:bg-muted cursor-pointer">
            <div className="flex flex-col items-center text-center space-y-2">
              <Edit className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium">Edit Cards</span>
            </div>
          </Card>
          
          <Card className="p-4 hover:bg-muted cursor-pointer">
            <div className="flex flex-col items-center text-center space-y-2">
              <CreditCard className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium">Practice</span>
            </div>
          </Card>
          
          <Card className="p-4 hover:bg-muted cursor-pointer">
            <div className="flex flex-col items-center text-center space-y-2">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium">Review</span>
            </div>
          </Card>
        </div>

        {/* Bottom section */}
        <div className="mt-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-blue-500 cursor-pointer">
              Flashcard output will be saved here.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              After adding sources, click to add flashcards and more!
            </p>
          </div>
          
          <Button className="w-full mb-2">
            <Plus className="w-4 h-4 mr-2" />
            Add flashcard
          </Button>
        </div>
      </div>
    </div>
  );
}
