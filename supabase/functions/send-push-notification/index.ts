
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationPayload {
  title: string;
  body: string;
  type?: 'product' | 'announcement' | 'general';
  related_id?: string;
  icon?: string;
  badge?: string;
  data?: any;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { title, body, type = 'general', related_id, icon, badge, data } = await req.json() as NotificationPayload;

    console.log('Sending push notification:', { title, body, type });

    // جلب جميع الاشتراكات النشطة
    const { data: subscriptions, error: fetchError } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('is_active', true);

    if (fetchError) {
      console.error('Error fetching subscriptions:', fetchError);
      throw fetchError;
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No active subscriptions found');
      return new Response(
        JSON.stringify({ message: 'لا توجد اشتراكات نشطة', sent_count: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${subscriptions.length} active subscriptions`);

    const vapidPublicKey = Deno.env.get('VAPID_PUBLIC_KEY');
    const vapidPrivateKey = Deno.env.get('VAPID_PRIVATE_KEY');

    if (!vapidPublicKey || !vapidPrivateKey) {
      throw new Error('مفاتيح VAPID غير متوفرة');
    }

    // إعداد الإشعار
    const notificationPayload = {
      title,
      body,
      icon: icon || '/favicon.ico',
      badge: badge || '/favicon.ico',
      data: {
        type,
        related_id,
        ...data,
      },
      actions: [
        {
          action: 'view',
          title: 'عرض'
        }
      ],
      tag: related_id || type,
      renotify: true,
      requireInteraction: false,
      silent: false,
      timestamp: Date.now(),
      dir: 'rtl',
      lang: 'ar'
    };

    let successCount = 0;
    let failureCount = 0;

    // إرسال الإشعارات
    for (const subscription of subscriptions) {
      try {
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: subscription.keys
        };

        // إرسال الإشعار باستخدام Web Push
        const response = await fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'Authorization': `key=${vapidPrivateKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: subscription.endpoint.split('/').pop(),
            notification: notificationPayload,
            data: notificationPayload.data
          })
        });

        if (response.ok) {
          successCount++;
          console.log(`Notification sent successfully to ${subscription.endpoint}`);
        } else {
          failureCount++;
          console.error(`Failed to send notification to ${subscription.endpoint}:`, await response.text());
          
          // إذا كان الاشتراك غير صالح، قم بإلغاء تفعيله
          if (response.status === 410) {
            await supabase
              .from('push_subscriptions')
              .update({ is_active: false })
              .eq('id', subscription.id);
          }
        }
      } catch (error) {
        failureCount++;
        console.error(`Error sending notification to ${subscription.endpoint}:`, error);
      }
    }

    // حفظ سجل الإشعار
    await supabase
      .from('notifications_log')
      .insert({
        title,
        body,
        type,
        related_id,
        sent_to_count: successCount + failureCount,
      });

    console.log(`Notification sending completed. Success: ${successCount}, Failed: ${failureCount}`);

    return new Response(
      JSON.stringify({
        message: 'تم إرسال الإشعارات',
        sent_count: successCount,
        failed_count: failureCount,
        total_subscriptions: subscriptions.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-push-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
