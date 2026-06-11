// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// 🔥 GANTI DENGAN CONFIG FIREBASE KAMU!
firebase.initializeApp({
  apiKey: "AIzaSyBz811o1BVe_1ItQWkJzpGoZPnbkCmEUKM",
  authDomain: "mm-tandes-notif.firebaseapp.com",
  projectId: "mm-tandes-notif",
  storageBucket: "mm-tandes-notif.appspot.com",
  messagingSenderId: "508016475673",
  appId: "1:508016475673:web:7946713ec521d327f43488"
});

const messaging = firebase.messaging();

// Handle push saat app di-background/closed
messaging.onBackgroundMessage((payload) => {
  console.log('[Firebase SW] Received background message:', payload);
  
  const notificationTitle = payload.notification?.title || '🔔 Pengingat Kegiatan';
  const notificationOptions = {
    body: payload.notification?.body || 'Ada kegiatan mendatang!',
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    vibrate: [200, 100, 200],
    data: {
      url: payload.data?.url || '/'
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});