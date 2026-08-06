import { fetchApi } from './api';
import { User } from '@/types';

export const authService = {
  async verifyToken(idToken: string): Promise<User> {
    return fetchApi<User>('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token: idToken }),
    });
  },

  async getUserProfile(): Promise<User> {
    return fetchApi<User>('/users/profile');
  },

  async updateUserProfile(data: Partial<User>): Promise<User> {
    return fetchApi<User>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
