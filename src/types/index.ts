export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  file?: File;
}

export interface Message {
  id: string;
  chatId: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: Attachment[];
  isStreaming?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messagesCount: number;
  lastMessageSnippet?: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  systemPrompt: string;
  autoScroll: boolean;
  enterToSend: boolean;
  saveHistory: boolean;
}
