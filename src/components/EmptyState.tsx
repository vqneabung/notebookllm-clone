import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import UploadModal from './UploadModal';

interface EmptyStateProps {
  onAddSources: (files: File[]) => void;
}

export default function EmptyState({ onAddSources }: EmptyStateProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-700 px-6 py-4">
        <h1 className="text-lg font-medium text-white">Chat</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Upload Icon */}
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
          <Upload className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-medium mb-6 text-white">Add a source to get started</h2>

        {/* Upload Button */}
        <Button 
          variant="outline" 
          className="bg-transparent border-gray-600 text-white hover:bg-gray-700 hover:text-white"
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload a source
        </Button>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              placeholder="Upload a source to get started"
              className="w-full px-4 py-3 pr-20 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <span className="text-xs text-gray-400">0 sources</span>
              <Button 
                size="sm"
                disabled
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={onAddSources}
      />
    </div>
  );
}
