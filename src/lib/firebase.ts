import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Helper: safely clean an env var value of hidden newlines / whitespace
// Use || (not ??) so empty string "" falls back to valid hardcoded credential
const cleanEnv = (val: string | undefined, fallback: string): string => {
  const str = (val && val.trim()) ? val.trim().replace(/[\r\n]/g, "") : "";
  return str || fallback;
};

// Official Firebase configuration for MarketMind AI (Project: marketmindai-73278)
const firebaseConfig = {
  apiKey:            cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY,             "AIzaSyB_xQn-Z6V77Z32xXMvWAeS1XwV38P7t10"),
  authDomain:        cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,         "marketmindai-73278.firebaseapp.com"),
  projectId:         cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,          "marketmindai-73278"),
  storageBucket:     cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,      "marketmindai-73278.firebasestorage.app"),
  messagingSenderId: cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, "772139736435"),
  appId:             cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID,              "1:772139736435:web:51d74fd1ddbb124f063906"),
  measurementId:     cleanEnv(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,      "G-0EGEV24PT0"),
};

// Validate required fields at startup
if (typeof window !== "undefined") {
  const required = ["apiKey", "authDomain", "projectId", "appId"] as const;
  for (const key of required) {
    if (!firebaseConfig[key]) {
      console.error(`[Firebase] Missing required config: ${key}. Check NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}.`);
    }
  }
  console.log("[Firebase] Project ID:", firebaseConfig.projectId);
}

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
