
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, File } from 'lucide-react';

interface FileUploaderProps {
  onFileUpload: (file: File | null) => void;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileUpload, 
  acceptedFileTypes = '*', 
  maxFileSizeMB = 10 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (!file) {
      setSelectedFile(null);
      onFileUpload(null);
      setError(null);
      return;
    }
    
    // Check file type
    if (acceptedFileTypes !== '*' && !file.type.match(acceptedFileTypes.replace('.', 'application/'))) {
      setError(`Please select a valid ${acceptedFileTypes} file`);
      return;
    }
    
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSizeMB) {
      setError(`File size should be less than ${maxFileSizeMB}MB`);
      return;
    }
    
    setSelectedFile(file);
    onFileUpload(file);
    setError(null);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={acceptedFileTypes}
          className="hidden"
          id="file-upload"
        />
        
        <div className="w-full border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-2">
          {!selectedFile ? (
            <>
              <Upload className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-500">Drag and drop your file here or</p>
              <Button type="button" variant="outline" onClick={handleBrowseClick}>
                Browse Files
              </Button>
              <p className="text-xs text-gray-400">
                {acceptedFileTypes !== '*' ? `Accepted file types: ${acceptedFileTypes}` : 'All file types accepted'} 
                (Max: {maxFileSizeMB}MB)
              </p>
            </>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <File className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRemoveFile}
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
