import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";

// Request notification permission and get FCM token
export const requestFirebaseNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BEykfUgg71SLfglL-l_ERrKZJhHHfoNa2YTbDNt16JEABxocpUA3WNWo6GuIDodPa-yYpEgSw7iX8H-u9bDVhok",
      });
      console.log("Device Token:", token);
      return token;
    } else {
      console.log("Notification permission not granted");
      return null;
    }
  } catch (error) {
    console.error("Error getting Firebase token:", error);
    return null;
  }
};

// Send the FCM token to backend
export const sendTokenToBackend = async (email) => {
  try {
    const token = await requestFirebaseNotificationPermission(); // get token once
    if (!token) return;

    const response = await fetch("http://localhost:5001/api/flask/register-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, email }),
    });

    const data = await response.json();
    console.log("Token sent to backend:", data);
  } catch (error) {
    console.error("Error sending token to backend:", error);
  }
};

// Listen for foreground messages
export const onMessageListener = (callback) => {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    if (callback) callback(payload);
  });
};
