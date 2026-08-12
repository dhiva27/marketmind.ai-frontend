// Client error message formatter

export function formatAuthError(error: any): string {
  if (!error) return 'An unexpected error occurred. Please try again.';
  if (typeof error === 'string') return error;
  return error.message || 'Authentication failed. Please check your details and try again.';
}
