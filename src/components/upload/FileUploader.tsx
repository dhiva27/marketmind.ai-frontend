'use client';

import React, { useRef } from 'react';
import { Paperclip } from 'lucide-react';

interface FileUploaderProps {
  onFilesSelected: (files: FileList) => void;
  disabled?: boolean;
}

export function FileUploader({ onFilesSelected, disabled }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        multiple
        accept=".pdf,.docx,.txt,.csv,.png,.jpg,.jpeg"
        className="hidden"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors disabled:opacity-40"
        title="Upload documents or images (PDF, DOCX, TXT, CSV, PNG, JPG, JPEG up to 20MB)"
      >
        <Paperclip className="w-5 h-5" />
      </button>
    </>
  );
}
