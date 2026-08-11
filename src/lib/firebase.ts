import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Official Firebase configuration for MarketMind AI (v7.20.0+)
const firebaseConfig = {
  apiKey: "AIzaSyDRJdbqJsBKA3Li-SKgbTvsGGdDnnZPDHw",
  authDomain: "marketmindai-f6162.firebaseapp.com",
  projectId: "marketmindai-f6162",
  storageBucket: "marketmindai-f6162.firebasestorage.app",
  messagingSenderId: "353953935639",
  appId: "1:353953935639:web:131219ba1f14702dbd4752",
  measurementId: "G-VEV1XRHDX2"
};

// Initialize Firebase (Next.js SSR singleton safe)
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

// Auto-trigger Analytics on client load
if (typeof window !== "undefined") {
  initAnalytics().catch(() => {});
}

export default app;
