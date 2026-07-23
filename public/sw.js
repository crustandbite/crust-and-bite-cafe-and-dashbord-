// Crust & Bite operations background Service Worker

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

  // Only notify for legitimate active order statuses
  if (!['new', 'pending', 'preparing', 'out_for_delivery'].includes(orderStatus.toLowerCase())) {
    console.log('[Service Worker] Skipped status:', orderStatus);
    return;
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // Check if there is an active foreground window of the dashboard
      const isClientVisible = clientList.some(function (client) {
        // Match the same domain, and check if it is active/visible
        return client.visibilityState === 'visible';
      });

      if (isClientVisible) {
        // App is open and visible; foreground Realtime and playChime() handles this.
        console.log('[Service Worker] Dashboard is currently visible. Skipping background native alert.');
        return;
      }

      // App is closed, backgrounded, or minimized; trigger native notification with system sound.
      const title = 'Crust & Bite';
      const body = `New Order #${orderId}\nCustomer: ${customerName}\nTotal: ₹${total}`;
      const options = {
        body: body,
        icon: '/images/logo.png',
        badge: '/images/logo.png',
        tag: `order-${orderId}`, // Separate tag per order to prevent overwriting other new order alerts
        data: {
          url: '/'
        }
      };

      return self.registration.showNotification(title, options);
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification;
  notification.close();

  const targetUrl = notification.data && notification.data.url ? notification.data.url : '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      // Find if we already have a window open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        // If it matches the origin, focus it
        if (client.url.indexOf(self.location.origin) === 0 && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});
