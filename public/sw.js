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
  if (!event.data) {
    console.log('[Service Worker] Push event received with no data.');
    return;
  }

  let payload = {};
  try {
    payload = event.data.json();
  } catch (err) {
    console.error('[Service Worker] Failed to parse push data as JSON:', err);
    return;
  }

  const orderId = payload.orderId;
  const customerName = payload.customerName || 'Guest';
  const total = payload.total || 0;
  const orderStatus = payload.orderStatus || 'new';
  const quantity = payload.itemQuantity || payload.quantity || payload.itemsCount || null;

  // Only notify for legitimate active order statuses
  if (!['new', 'pending', 'preparing', 'out_for_delivery'].includes(orderStatus.toLowerCase())) {
    console.log('[Service Worker] Skipped status:', orderStatus);
    return;
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // Check if there is an active foreground window of the dashboard
      const isClientVisible = clientList.some(function (client) {
        return client.visibilityState === 'visible';
      });

      if (isClientVisible) {
        console.log('[Service Worker] Dashboard is currently visible. Skipping background native alert.');
        return;
      }

      // App is closed, backgrounded, or minimized; trigger native notification
      const title = 'Crust & Bite';
      
      let body = `New Order #${orderId}\nCustomer: ${customerName}`;
      if (quantity) {
        body += `\nQuantity: ${quantity}`;
      }
      body += `\nTotal: ₹${total}`;

      const options = {
        body: body,
        icon: '/icons/icon-192.png',
        badge: '/icons/badge-72.png',
        tag: `order-${orderId}`, // Unique tag per order to avoid collapsing
        data: {
          url: '/?adminTab=orders'
        }
      };

      return self.registration.showNotification(title, options);
    })
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
