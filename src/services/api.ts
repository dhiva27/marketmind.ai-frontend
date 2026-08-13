import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const RAW_BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/+$/, '');

// Ensure API_BASE_URL ends with '/api'
let API_BASE_URL = 'http://localhost:5000/api';
if (RAW_BACKEND_URL) {
  API_BASE_URL = RAW_BACKEND_URL.endsWith('/api') ? RAW_BACKEND_URL : `${RAW_BACKEND_URL}/api`;
}

/**
 * Helper to get the current Firebase User, waiting for Firebase auth 
 * state initialization if auth.currentUser is initially null on page load.
 */
function getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      return resolve(auth.currentUser);
    }

    const timer = setTimeout(() => {
      unsubscribe();
      resolve(null);
    }, 2500);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      clearTimeout(timer);
      unsubscribe();
      resolve(user);
    });
  });
}

/**
 * Get a fresh Firebase ID token for the current user.
 * Waits for Firebase session initialization on page load.
 */
async function getFirebaseToken(): Promise<string | null> {
  try {
    const user = await getCurrentUser();
    if (user) {
      return await user.getIdToken(/* forceRefresh */ false);
    }
  } catch (err) {
    console.warn('[api] Could not get Firebase ID token:', err);
  }
  return null;
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getFirebaseToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Guarantee clean path concatenation
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[api] ${options.method || 'GET'} ${url} | auth: ${token ? 'token present' : 'no token'}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch {
      // ignore JSON parse error
    }

    if (response.status === 401) throw new Error('Authentication required. Please sign in again.');
    if (response.status === 403) throw new Error("You don't have permission to access this data.");
    if (response.status === 404) throw new Error(`Chat history endpoint is unavailable (${url}).`);
    if (response.status >= 500) throw new Error('Unable to load chat history right now. Please try again.');

    throw new Error(message);
  }

  return response.json();
}
