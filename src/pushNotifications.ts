import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Converts a Base64 URL-safe string to a Uint8Array.
 * Required for passing the applicationServerKey to PushManager.subscribe.
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

/**
 * Checks if the browser supports notifications, service workers, and push manager.
 */
export function checkPushSupport(): {
  supported: boolean
  reason?: 'notifications' | 'serviceworker' | 'pushmanager'
} {
  if (!('Notification' in window)) {
    return { supported: false, reason: 'notifications' }
  }
  if (!('serviceWorker' in navigator)) {
    return { supported: false, reason: 'serviceworker' }
  }
  if (!('PushManager' in window)) {
    return { supported: false, reason: 'pushmanager' }
  }
  return { supported: true }
}

/**
 * Retrieves the current permission state.
 */
export function getNotificationPermission(): NotificationPermission {
  if (!('Notification' in window)) return 'denied'
  return Notification.permission
}

/**
 * Explicitly requests notification permission from the user.
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  const support = checkPushSupport()
  if (!support.supported) {
    throw new Error(`Push notifications are not supported on this browser/device: ${support.reason}`)
  }
  return await Notification.requestPermission()
}

/**
 * Registers the Service Worker file.
 */
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
  const support = checkPushSupport()
  if (!support.supported) {
    throw new Error('Service Worker registration not supported')
  }
  // Registers sw.js from the public root directory
  return await navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  })
}

/**
 * Retrieves an existing push subscription or creates a new one.
 */
export async function subscribeUserToPush(
  registration: ServiceWorkerRegistration,
  vapidPublicKey: string
): Promise<PushSubscription> {
  const subscription = await registration.pushManager.getSubscription()
  if (subscription) {
    return subscription
  }

  const convertedKey = urlBase64ToUint8Array(vapidPublicKey)
  return await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey as any
  })
}

/**
 * Synchronizes the subscription status to the Supabase database.
 * Does not throw errors if database schemas or tables do not exist yet (Phase 1 safety).
 */
export async function saveSubscriptionToDatabase(
  supabaseClient: SupabaseClient,
  subscription: PushSubscription
): Promise<{ success: boolean; error?: any }> {
  try {
    const { endpoint, keys } = subscription.toJSON()
    if (!endpoint || !keys) {
      return { success: false, error: 'Subscription missing endpoint or keys' }
    }

    // Insert or update on conflict of endpoint
    const { error } = await supabaseClient
      .from('push_subscriptions')
      .upsert(
        {
          endpoint,
          keys,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'endpoint' }
      )

    if (error) {
      console.warn('Failed to save subscription (table might not exist yet):', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (err: any) {
    console.warn('Failed to save subscription to database:', err)
    return { success: false, error: err }
  }
}

/**
 * Unsubscribes the user from push manager and removes the endpoint from Supabase.
 */
export async function unsubscribeUserFromPush(
  supabaseClient: SupabaseClient,
  registration: ServiceWorkerRegistration
): Promise<boolean> {
  try {
    const subscription = await registration.pushManager.getSubscription()
    if (!subscription) return true

    const endpoint = subscription.endpoint
    await subscription.unsubscribe()

    // Delete record from Supabase table if it exists
    await supabaseClient
      .from('push_subscriptions')
      .delete()
      .eq('endpoint', endpoint)

    return true
  } catch (err) {
    console.error('Error during push unsubscription:', err)
    return false
  }
}
