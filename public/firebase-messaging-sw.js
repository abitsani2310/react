importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDvNnN7mkuYSRzvVEQIH_3w1JpRFnSXnZc",
  authDomain: "sorbannaga-99.firebaseapp.com",
  projectId: "sorbannaga-99",
  storageBucket: "sorbannaga-99.appspot.com",
  messagingSenderId: "791106036546",
  appId: "1:791106036546:web:b9c9dc3b1da3b91be71edb",
  measurementId: "G-E24YZS71E1"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
