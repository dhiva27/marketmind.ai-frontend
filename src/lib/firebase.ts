import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRJdbqJsBKA3Li-SKgbTvsGGdDnnZPDHw",
  authDomain: "marketmindai-f6162.firebaseapp.com",
  projectId: "marketmindai-f6162",
  storageBucket: "marketmindai-f6162.firebasestorage.app",
  messagingSenderId: "353953935639",
  appId: "1:353953935639:web:131219ba1f14702dbd4752",
  measurementId: "G-VEV1XRHDX2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};
