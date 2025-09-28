import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Upload, 
  X, 
  FileText, 
  Link, 
  Globe, 
  Youtube, 
  Clipboard,
  HardDrive,
  Folder
} from 'lucide-react';
import useStateRef from 'react-usestateref';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: File[]) => void;
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [dragActive, setDragActive] = useStateRef(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Uploaded files:', acceptedFiles);
    // Automatically upload files when selected/dropped
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles);
      onClose();
    }
  }, [onUpload, onClose]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt', '.docx'],
      'text/markdown': ['.md'],
      'audio/*': ['.mp3', '.wav', '.m4a']
    },
    multiple: true
  });



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <DialogTitle className="text-white">Add sources</DialogTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={onClose}
          >
            <span className="text-sm">Discover sources</span>
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div className="text-gray-400 text-sm">
            <p>Sources let NotebookLM base its responses on the information that matters most to you.</p>
            <p className="mt-1">(Examples: marketing plans, course reading, research notes, meeting transcripts, sales documents, etc.)</p>
          </div>

          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isDragActive || dragActive
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-600 hover:border-gray-500'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Upload sources</h3>
                <p className="text-gray-400">
                  Drag and drop or{' '}
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    choose file
                  </span>{' '}
                  to upload
                </p>
              </div>
            </div>
          </div>

          {/* Supported file types */}
          <p className="text-center text-gray-500 text-sm">
            Supported file types: PDF, txt, Markdown, Audio (e.g. mp3)
          </p>  

          {/* Source limit */}
          <div className="flex items-center justify-between py-4 border-t border-gray-700">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">Source limit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-48 h-2 bg-gray-700 rounded-full">
                <div className="w-0 h-2 bg-blue-600 rounded-full"></div>
              </div>
              <span className="text-gray-400 text-sm">1/50</span>
            </div>
          </div>


        </div>
      </DialogContent>
    </Dialog>
  );
}
