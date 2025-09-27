import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white text-white">
      {/* Upload Icon */}
      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-6">
        <Upload className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-medium mb-6 text-black">Add a source to get started</h2>

      {/* Upload Button */}
      <Button 
        variant="outline" 
        className="bg-transparent border-gray-100 text-black hover:bg-gray-300"
      >
        Upload a source
      </Button>
    </div>
  );
}
