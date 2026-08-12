import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Helper to strip hidden \r\n line breaks or whitespace from environment variables
const clean = (val: string | undefined): string =>
  (val || "").trim().replace(/[\r\n]/g, "");

const firebaseConfig = {
  apiKey:            clean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  authDomain:        clean(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
  projectId:         clean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  storageBucket:     clean(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: clean(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId:             clean(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  measurementId:     clean(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const githubProvider = new GithubAuthProvider();

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
