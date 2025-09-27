import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface SourceItemProps {
  id: string;
  title: string;
  checked: boolean;
  onToggle: (id: string) => void;
  iconColor?: string;
}

export default function SourceItem({ id, title, checked, onToggle, iconColor = "bg-red-500" }: SourceItemProps) {
  return (
    <Card className="p-3 mb-3">
      <div className="flex items-start space-x-3">
        <div className={`w-6 h-6 ${iconColor} rounded flex items-center justify-center flex-shrink-0`}>
          <FileText className="w-3 h-3 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <input 
              type="checkbox" 
              className="rounded" 
              checked={checked}
              onChange={() => onToggle(id)}
            />
            <span className="text-sm font-medium truncate">
              {title}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
