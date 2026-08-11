import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase web config — these are public values (not secrets).
// Firebase security is enforced via Firebase Security Rules, not by hiding this config.
const firebaseConfig = {
  apiKey: "AIzaSyDRJdbqJsBKA3Li-SKgbTvsGGdDnnZPDHw",
  authDomain: "marketmindai-f6162.firebaseapp.com",
  projectId: "marketmindai-f6162",
  storageBucket: "marketmindai-f6162.firebasestorage.app",
  messagingSenderId: "353953935639",
  appId: "1:353953935639:web:131219ba1f14702dbd4752",
  measurementId: "G-VEV1XRHDX2"
};

// Initialize Firebase App (singleton-safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth & Firestore exports
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google provider — force account chooser
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// GitHub provider
export const githubProvider = new GithubAuthProvider();

// SSR-Safe Analytics
export const initAnalytics = async () => {
  if (typeof window !== "undefined" && (await isSupported())) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
