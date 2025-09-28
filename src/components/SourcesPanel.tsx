import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import SourceItem from './SourceItem';
import UploadModal from './UploadModal';

interface Source {
  id: string;
  title: string;
  checked: boolean;
}

interface SourcesPanelProps {
  sources: Source[];
  onToggleSource: (id: string) => void;
  onToggleAll: () => void;
  allChecked: boolean;
  onAddSources: (files: File[]) => void;
}

export default function SourcesPanel({ sources, onToggleSource, onToggleAll, allChecked, onAddSources }: SourcesPanelProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  return (
    <div className="w-80 bg-background border-r flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-3">Sources</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Search className="w-4 h-4 mr-2" />
            Discover
          </Button>
        </div>
      </div>

      {/* Sources List */}
      <div className="flex-1 p-4">
        {sources.length > 0 && (
          <div className="mb-4">
            <label className="flex items-center space-x-2 text-sm">
              <input 
                type="checkbox" 
                className="rounded" 
                checked={allChecked}
                onChange={onToggleAll}
              />
              <span>Select all sources</span>
            </label>
          </div>
        )}

        {sources.map((source) => (
          <SourceItem
            key={source.id}
            id={source.id}
            title={source.title}
            checked={source.checked}
            onToggle={onToggleSource}
          />
        ))}
      </div>

      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={onAddSources}
      />
    </div>
  );
}
