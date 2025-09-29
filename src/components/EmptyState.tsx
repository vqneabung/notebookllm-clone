import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload } from 'lucide-react';
import UploadModal from './UploadModal';

interface EmptyStateProps {
  onAddSources: (files: File[]) => void;
  isUploading?: boolean;
  uploadProgress?: string;
  uploadPercentage?: number;
}

export default function EmptyState({ onAddSources, isUploading = false, uploadProgress = '', uploadPercentage = 0 }: EmptyStateProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border px-6 py-4">
        <h1 className="text-lg font-medium text-foreground">Chat</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Upload Icon */}
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-6">
          <Upload className="w-6 h-6 text-primary-foreground" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-medium mb-6 text-foreground">
          {isUploading ? "Processing your source..." : "Add a source to get started"}
        </h2>

        {/* Upload Progress or Button */}
        {isUploading ? (
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="text-sm">Processing files...</span>
          </div>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => setIsUploadModalOpen(true)}
          >
            Upload a source
          </Button>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t border-border p-4">
        <div className="max-w-4xl mx-auto">
          {/* Upload Progress Indicator - only show when uploading */}
          {isUploading && (
            <div className="mb-4 p-4 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                <span className="text-sm text-muted-foreground">{uploadProgress}</span>
                <span className="text-xs text-muted-foreground ml-auto">{uploadPercentage}%</span>
              </div>
              <Progress value={uploadPercentage} className="h-2" />
            </div>
          )}
          
          <div className="relative">
            <input
              placeholder={isUploading ? "Processing files..." : "Upload a source to get started"}
              className="w-full px-4 py-3 pr-20 bg-background border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              disabled
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">0 sources</span>
              <Button 
                size="sm"
                disabled
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen && !isUploading}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={onAddSources}
      />
    </div>
  );
}
