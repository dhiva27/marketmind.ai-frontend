import { fetchApi } from './api';
import { Chat, Message } from '@/types';

export const chatService = {
  async getChats(): Promise<Chat[]> {
    return fetchApi<Chat[]>('/chats');
  },

  async createChat(title?: string): Promise<Chat> {
    return fetchApi<Chat>('/chats', {
      method: 'POST',
      body: JSON.stringify({ title: title || 'New Conversation' }),
    });
  },

  async renameChat(chatId: string, title: string): Promise<Chat> {
    return fetchApi<Chat>(`/chats/${chatId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title }),
    });
  },

  async deleteChat(chatId: string): Promise<{ success: boolean }> {
    return fetchApi<{ success: boolean }>(`/chats/${chatId}`, {
      method: 'DELETE',
    });
  },

  async getMessages(chatId: string): Promise<Message[]> {
    return fetchApi<Message[]>(`/chats/${chatId}/messages`);
  },

  async sendMessage(chatId: string, content: string, attachmentIds?: string[]): Promise<Message> {
    return fetchApi<Message>(`/chats/${chatId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content, attachmentIds }),
    });
  },
};
