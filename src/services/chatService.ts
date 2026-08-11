import { fetchApi } from './api';
import { Chat, Message } from '@/types';

export const chatService = {
  async getHistory(): Promise<Chat[]> {
    return fetchApi<any[]>('/chat/history').then((sessions) =>
      sessions.map((s) => ({
        id: s.chatId,
        title: s.title,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        messagesCount: s.messagesCount || 0,
        lastMessageSnippet: s.lastMessageSnippet,
      }))
    );
  },

  async getMessages(chatId: string): Promise<Message[]> {
    return fetchApi<any[]>(`/chat/${chatId}`).then((messages) =>
      messages.map((m) => ({
        id: m._id || m.id,
        chatId: m.chatId,
        sender: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
        timestamp: new Date(m.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }))
    );
  },

  async sendMessage(chatId: string, content: string): Promise<{ userMessage: Message; aiMessage: Message; chatSession?: any }> {
    const res = await fetchApi<any>('/chat', {
      method: 'POST',
      body: JSON.stringify({ chatId, content }),
    });

    const userMessage: Message = {
      id: res.userMessage._id || res.userMessage.id || `msg_${Date.now()}`,
      chatId,
      sender: 'user',
      content: res.userMessage.content,
      timestamp: new Date(res.userMessage.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const aiMessage: Message = {
      id: res.aiMessage._id || res.aiMessage.id || `msg_${Date.now()}`,
      chatId,
      sender: 'assistant',
      content: res.aiMessage.content,
      timestamp: new Date(res.aiMessage.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    return { userMessage, aiMessage, chatSession: res.chatSession };
  },

  async renameChat(chatId: string, title: string): Promise<any> {
    return fetchApi<any>(`/chat/${chatId}/title`, {
      method: 'PUT',
      body: JSON.stringify({ title }),
    });
  },

  async deleteChat(chatId: string): Promise<any> {
    return fetchApi<any>(`/chat/${chatId}`, {
      method: 'DELETE',
    });
  },
};
