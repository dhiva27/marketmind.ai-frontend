import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Clean CRLF line breaks or whitespace from environment variables
const clean = (val: string | undefined, fallback: string): string => {
  const str = (val && val.trim()) ? val.trim().replace(/[\r\n]/g, "") : "";
  return str || fallback;
};

// Official Firebase configuration for MarketMind AI (Project: marketmindai-eba97)
const firebaseConfig = {
  apiKey:            clean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY,             "AIzaSyA5pabn6x0XG4S_leOseWZf-DZrfDZvsyk"),
  authDomain:        clean(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,         "marketmindai-eba97.firebaseapp.com"),
  projectId:         clean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,          "marketmindai-eba97"),
  storageBucket:     clean(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,      "marketmindai-eba97.firebasestorage.app"),
  messagingSenderId: clean(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, "101610126186"),
  appId:             clean(process.env.NEXT_PUBLIC_FIREBASE_APP_ID,              "1:101610126186:web:13912943a4f0c617ff8313"),
  measurementId:     clean(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,      "G-891MC9FBJ9"),
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
