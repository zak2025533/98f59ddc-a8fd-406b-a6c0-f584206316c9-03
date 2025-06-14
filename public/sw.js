
const CACHE_NAME = 'notifications-v1';

// تثبيت service worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

// تفعيل service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(self.clients.claim());
});

// التعامل مع الإشعارات الواردة
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);

  if (!event.data) {
    console.log('No data in push event');
    return;
  }

  try {
    const data = event.data.json();
    console.log('Push notification data:', data);

    const options = {
      body: data.body,
      icon: data.icon || '/favicon.ico',
      badge: data.badge || '/favicon.ico',
      data: data.data || {},
      actions: data.actions || [
        {
          action: 'view',
          title: 'عرض'
        }
      ],
      tag: data.data?.type || 'general',
      renotify: true,
      requireInteraction: false,
      silent: false,
      timestamp: Date.now(),
      dir: 'rtl',
      lang: 'ar'
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } catch (error) {
    console.error('Error processing push notification:', error);
  }
});

// التعامل مع النقر على الإشعار
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);

  event.notification.close();

  const data = event.notification.data;
  let url = '/';

  // تحديد الرابط بناءً على نوع الإشعار
  if (data.type === 'product') {
    url = '/';
  } else if (data.type === 'announcement') {
    url = '/';
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // البحث عن نافذة مفتوحة للتطبيق
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          client.navigate(url);
          return;
        }
      }

      // فتح نافذة جديدة إذا لم توجد نافذة مفتوحة
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// التعامل مع رسائل من التطبيق الرئيسي
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
