// Import Firebase scripts from CDN (plain JS)
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

// Initialize Firebase inside service worker
firebase.initializeApp({
  apiKey: "AIzaSyAAlufXQTTk3HZm_lypcypp5CVNj1Mp2J0",
  authDomain: "ayuja-d237b.firebaseapp.com",
  projectId: "ayuja-d237b",
  storageBucket: "ayuja-d237b.firebasestorage.app",
  messagingSenderId: "531525746381",
  appId: "1:531525746381:web:91bf4435053e08fd2ab384",
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Optional: Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico', // optional
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
