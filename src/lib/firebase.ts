import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Read Firebase Web App configuration dynamically from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB_xQn-Z6V77Z32xXMvWAeS1XwV38P7t10",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "marketmindai-73278.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "marketmindai-73278",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "marketmindai-73278.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "772139736435",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:772139736435:web:51d74fd1ddbb124f063906",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-0EGEV24PT0",
};

// Initialize Firebase (SSR singleton-safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth & Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Authentication Providers
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const githubProvider = new GithubAuthProvider();

// SSR-Safe Analytics Initialization
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getAnalytics(app);
  }
  return null;
};

if (typeof window !== "undefined") {
  initAnalytics().catch(() => {});
}

export default app;
