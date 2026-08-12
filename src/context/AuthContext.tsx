'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = 'marketmind_user';
const LOCAL_TOKEN_KEY = 'marketmind_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(LOCAL_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default logged-in user state for immediate workspace access
        const defaultUser: User = {
          uid: 'user_default',
          email: 'dhivakar@marketmind.ai',
          displayName: 'Dhivakar',
          createdAt: new Date().toISOString(),
        };
        setUser(defaultUser);
        localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(defaultUser));
        localStorage.setItem(LOCAL_TOKEN_KEY, 'demo_auth_token');
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  }, []);

  const saveUserSession = (u: User | null) => {
    setUser(u);
    if (u) {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(u));
      localStorage.setItem(LOCAL_TOKEN_KEY, `token_${u.uid}`);
    } else {
      localStorage.removeItem(LOCAL_USER_KEY);
      localStorage.removeItem(LOCAL_TOKEN_KEY);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    const u: User = {
      uid: `user_${Date.now()}`,
      email,
      displayName: email.split('@')[0] || 'Dhivakar',
      createdAt: new Date().toISOString(),
    };
    saveUserSession(u);
    setLoading(false);
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    const u: User = {
      uid: `user_${Date.now()}`,
      email,
      displayName: name || email.split('@')[0] || 'Dhivakar',
      createdAt: new Date().toISOString(),
    };
    saveUserSession(u);
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    const u: User = {
      uid: `user_google_${Date.now()}`,
      email: 'dhivakar@marketmind.ai',
      displayName: 'Dhivakar',
      createdAt: new Date().toISOString(),
    };
    saveUserSession(u);
    setLoading(false);
  };

  const loginWithGithub = async () => {
    setLoading(true);
    const u: User = {
      uid: `user_github_${Date.now()}`,
      email: 'dhivakar@marketmind.ai',
      displayName: 'Dhivakar',
      createdAt: new Date().toISOString(),
    };
    saveUserSession(u);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    saveUserSession(null);
    setLoading(false);
  };

  const resetPassword = async (email: string) => {
    // Password reset simulation
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        loginWithGoogle,
        loginWithGithub,
        logout,
        resetPassword,
      }}
    >
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
