// Helper to map Firebase Auth error codes into clean, user-friendly messages

export function formatFirebaseError(error: any): string {
  if (!error) return 'An unexpected error occurred. Please try again.';

  const code = error.code || error.message || '';

  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid email or password. Please check your credentials.';

    case 'auth/email-already-in-use':
      return 'An account with this email address already exists. Try signing in instead.';

    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';

    case 'auth/invalid-email':
      return 'Please enter a valid email address.';

    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing login.';

    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked by your browser. Please allow popups and try again.';

    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address using a different sign-in provider.';

    case 'auth/operation-not-allowed':
      return 'This sign-in method is currently disabled in Firebase console.';

    case 'auth/network-request-failed':
      return 'Network request failed. Please check your internet connection and try again.';

    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed login attempts. You can reset your password or try again later.';

    default:
      if (typeof error === 'string') return error;
      return error.message || 'Authentication failed. Please check your credentials and try again.';
  }
}
