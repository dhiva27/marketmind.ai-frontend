'use client';

import React from 'react';
import { Attachment } from '@/types';
import { AttachmentBadge } from '@/components/upload/AttachmentBadge';

interface FilePreviewProps {
  attachments: Attachment[];
  onRemove?: (id: string) => void;
  readOnly?: boolean;
}

export function FilePreview({ attachments, onRemove, readOnly = false }: FilePreviewProps) {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 py-2">
      {attachments.map((att) => (
        <AttachmentBadge
          key={att.id}
          attachment={att}
          onRemove={onRemove}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}
