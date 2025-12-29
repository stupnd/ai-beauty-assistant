import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "REMOVED",
  authDomain: "ai-beauty-assistant.firebaseapp.com",
  projectId: "ai-beauty-assistant",
  storageBucket: "ai-beauty-assistant.firebasestorage.app",
  messagingSenderId: "67772230176",
  appId: "1:67772230176:web:bc746ee29fd8ba09b0aa45",
  measurementId: "G-XW2CW2WR82",
};

// Prevent re-initializing on fast refresh
export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const storage = getStorage(app);
