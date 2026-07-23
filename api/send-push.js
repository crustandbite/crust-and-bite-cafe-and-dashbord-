import { createClient } from '@supabase/supabase-js'
import webpush from 'web-push'

export default async function handler(req, res) {
  // 1. Validate HTTP Method
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // 2. Validate Custom Header Webhook Secret
  const webhookSecret = req.headers['x-webhook-secret']
  if (!webhookSecret || webhookSecret !== process.env.PUSH_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized webhook request' })
  }

  const body = req.body
  if (!body) {
    return res.status(400).json({ error: 'Missing request body' })
  }

  // 3. Validate Webhook Event Filters
  if (body.type !== 'INSERT' || body.table !== 'orders' || body.schema !== 'public') {
    return res.status(200).json({ message: 'Ignored non-INSERT or unrelated table events.' })
  }

  const record = body.record
  if (!record || !record.id) {
    return res.status(400).json({ error: 'Invalid webhook record payload' })
  }

  const orderId = record.id
  const customerName = record.customer_name || 'Guest'
  const total = record.total || 0
  const orderStatus = (record.order_status || 'new').toLowerCase()

  // 4. Validate Order Status (Only notify for active statuses)
  const activeStatuses = ['new', 'pending', 'preparing', 'out_for_delivery']
  if (!activeStatuses.includes(orderStatus)) {
    return res.status(200).json({ message: `Ignored status: ${orderStatus}` })
  }

  // 5. Verify Server-Side Credentials Exist
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
  const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY
  const vapidSubject = process.env.VAPID_SUBJECT

  if (!supabaseUrl || !serviceRoleKey || !vapidPublicKey || !vapidPrivateKey || !vapidSubject) {
    console.error('Server configuration error: Missing required push notification environment variables.')
    return res.status(500).json({ error: 'Missing server configurations' })
  }

  // 6. Initialize Web Push Credentials
  webpush.setVapidDetails(
    vapidSubject,
    vapidPublicKey,
    vapidPrivateKey
  )

  // 7. Initialize High-Privilege Server-Side Supabase Client (bypasses RLS)
  const supabase = createClient(supabaseUrl, serviceRoleKey)

  try {
    // 8. Fetch Registered Subscriptions
    const { data: subscriptions, error: dbError } = await supabase
      .from('push_subscriptions')
      .select('id, endpoint, keys')

    if (dbError) {
      console.error('Failed to retrieve push subscriptions from database:', dbError)
      return res.status(500).json({ error: 'Database retrieval failed' })
    }

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({
        message: 'No push subscriptions registered.',
        attempted: 0,
        successful: 0,
        failed: 0,
        expiredRemoved: 0
      })
    }

    // 9. Prepare Notification Payload
    const payload = JSON.stringify({
      orderId,
      customerName,
      total,
      orderStatus
    })

    let attempted = 0
    let successful = 0
    let failed = 0
    let expiredRemoved = 0

    // 10. Broadcast Push Payload to All Registered Subscriptions
    const pushPromises = subscriptions.map(async (sub) => {
      attempted++
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: sub.keys
      }

      try {
        await webpush.sendNotification(pushSubscription, payload)
        successful++
      } catch (err) {
        failed++
        // Inspect error status codes
        if (err.statusCode === 404 || err.statusCode === 410) {
          // Subscription has expired or been revoked; delete from database
          expiredRemoved++
          const { error: deleteError } = await supabase
            .from('push_subscriptions')
            .delete()
            .eq('id', sub.id)

          if (deleteError) {
            console.error(`Failed to delete expired subscription ID ${sub.id}:`, deleteError)
          } else {
            console.log(`Successfully deleted expired push subscription ID ${sub.id}`)
          }
        } else {
          console.error(`Error sending push to endpoint ${sub.endpoint.slice(0, 30)}...:`, err.message || err)
        }
      }
    })

    await Promise.all(pushPromises)

    return res.status(200).json({
      message: 'Push notification broadcast complete.',
      attempted,
      successful,
      failed,
      expiredRemoved
    })

  } catch (err) {
    console.error('Failed to process push broadcast:', err)
    return res.status(500).json({ error: 'Internal server error during broadcast' })
  }
}
