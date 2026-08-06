'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  uid: 'usr_mock_123',
  email: 'alex@example.com',
  displayName: 'Alex Morgan',
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for persistent mock session
    const stored = localStorage.getItem('marketmind_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(MOCK_USER);
      }
    } else {
      setUser(MOCK_USER); // Default logged in state for seamless preview
      localStorage.setItem('marketmind_user', JSON.stringify(MOCK_USER));
    }
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    const newUser: User = {
      uid: `usr_${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('marketmind_user', JSON.stringify(newUser));
    setLoading(false);
  };

  const signup = async (name: string, email: string) => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 600));
    const newUser: User = {
      uid: `usr_${Date.now()}`,
      email,
      displayName: name || email.split('@')[0],
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem('marketmind_user', JSON.stringify(newUser));
    setLoading(false);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('marketmind_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
