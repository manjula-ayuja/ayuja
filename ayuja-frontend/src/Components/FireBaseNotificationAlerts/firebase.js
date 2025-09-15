import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAAlufXQTTk3HZm_lypcypp5CVNj1Mp2J0",
  authDomain: "ayuja-d237b.firebaseapp.com",
  projectId: "ayuja-d237b",
  storageBucket: "ayuja-d237b.firebasestorage.app",
  messagingSenderId: "531525746381",
  appId: "1:531525746381:web:91bf4435053e08fd2ab384",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}