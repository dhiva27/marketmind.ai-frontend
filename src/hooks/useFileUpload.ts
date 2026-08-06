import { useState } from 'react';
import { Attachment } from '@/types';

const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.txt', '.csv', '.png', '.jpg', '.jpeg'];
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/csv',
  'image/png',
  'image/jpeg',
];
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export function useFileUpload() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `File "${file.name}" exceeds the maximum 20MB limit.`;
    }

    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    const isExtAllowed = ALLOWED_EXTENSIONS.includes(ext);
    const isMimeAllowed = ALLOWED_MIME_TYPES.includes(file.type);

    if (!isExtAllowed && !isMimeAllowed) {
      return `Unsupported file format "${file.name}". Supported: PDF, DOCX, TXT, CSV, PNG, JPG, JPEG.`;
    }

    return null;
  };

  const handleFiles = (files: FileList | File[]) => {
    setError(null);
    const fileArray = Array.from(files);
    const newAttachments: Attachment[] = [];

    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }

      newAttachments.push({
        id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        name: file.name,
        size: file.size,
        type: file.type || file.name.split('.').pop()?.toUpperCase() || 'FILE',
        url: URL.createObjectURL(file),
        file,
      });
    }

    setAttachments((prev) => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const clearAttachments = () => {
    setAttachments([]);
    setError(null);
  };

  return {
    attachments,
    error,
    handleFiles,
    removeAttachment,
    clearAttachments,
    setError,
  };
}
