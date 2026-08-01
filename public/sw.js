// Crust & Bite operations background Service Worker

const CACHE_NAME = 'crust-bite-dashboard-cache-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/badge-72.png'
];

// 1. Install Event - Pre-cache Static Assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

// 2. Activate Event - Clean Up Old Caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// 3. Fetch Event - Caching with exclusions (api/Supabase/POST requests)
self.addEventListener('fetch', function (event) {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Exclude Vercel API routes, Supabase queries, and dynamic order logic
  if (
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('supabase.co') ||
    url.pathname.includes('/orders') ||
    url.pathname.includes('/order')
  ) {
    return;
  }

  // Use Stale-While-Revalidate caching strategy for static assets and client app shell
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(request).then(function (cachedResponse) {
        const fetchPromise = fetch(request).then(function (networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(function (err) {
          console.log('[Service Worker] Network request failed:', err);
        });

        return cachedResponse || fetchPromise;
      });
    })
  );
});

// 4. Push Event - Receive and Display Notification
self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Event Received.');

  if (!event.data) {
    console.warn('[Service Worker] Push event contains no payload data.');
    return;
  }

  let title = 'Crust & Bite';
  let options = {};

  try {
    const payload = event.data.json();
    console.log('[Service Worker] Parsed push notification payload:', payload);

    const orderId = payload.id || payload.orderId || 'General';
    const totalAmount = payload.total || 0;

    title = payload.title || 'Crust & Bite';
    if (title === 'White House Cafe') {
      title = 'Crust & Bite';
    }

    let bodyText = payload.body;
    if (!bodyText) {
      const customerName = payload.customerName || 'Guest';
      const quantity = payload.itemQuantity || payload.quantity || payload.itemsCount || null;
      bodyText = `New Order #${orderId}\nCustomer: ${customerName}`;
      if (quantity) {
        bodyText += `\nQuantity: ${quantity}`;
      }
      bodyText += `\nTotal: ₹${totalAmount}`;
    }

    options = {
      body: bodyText,
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      tag: orderId ? `order-${orderId}` : 'new-order-general',
      renotify: true,
      requireInteraction: true,
      data: {
        orderId: orderId,
        url: payload.url || '/?adminTab=orders' // Target URL
      }
    };
  } catch (err) {
    console.warn('[Service Worker] Payload is not JSON. Falling back to plain text parsing:', err);
    options = {
      body: event.data.text(),
      icon: '/icons/icon-192.png',
      badge: '/icons/badge-72.png',
      tag: 'new-order-fallback',
      data: {
        url: '/?adminTab=orders'
      }
    };
  }

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 5. Notification Click Event - Focus or Open Window and Navigate
self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  notification.close();

  const targetUrl = '/?adminTab=orders';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // Find if we already have a window open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        // If it matches the origin, focus and navigate it
        if (client.url.indexOf(self.location.origin) === 0) {
          const promises = [];
          if ('focus' in client) {
            promises.push(client.focus());
          }
          if ('navigate' in client) {
            promises.push(client.navigate(targetUrl));
          }
          return Promise.all(promises);
        }
      }
      // If no window is open, open a new one
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
