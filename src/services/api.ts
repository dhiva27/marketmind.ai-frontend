const RAW_BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/+$/, '');

// Ensure API_BASE_URL ends with '/api'
let API_BASE_URL = 'http://localhost:5000/api';
if (RAW_BACKEND_URL) {
  API_BASE_URL = RAW_BACKEND_URL.endsWith('/api') ? RAW_BACKEND_URL : `${RAW_BACKEND_URL}/api`;
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('marketmind_token') : null;

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

    // Specific user-friendly messages per status code
    if (response.status === 401) throw new Error('Authentication required. Please sign in again.');
    if (response.status === 403) throw new Error("You don't have permission to access this data.");
    if (response.status === 404) throw new Error(`Chat history endpoint is unavailable (${url}).`);
    if (response.status >= 500) throw new Error('Unable to load chat history right now. Please try again.');

    throw new Error(message);
  }

  return response.json();
}
