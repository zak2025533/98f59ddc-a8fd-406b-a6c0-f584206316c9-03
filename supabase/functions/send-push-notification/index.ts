
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface NotificationPayload {
  title: string;
  body: string;
  type: 'product' | 'announcement' | 'general';
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { title, body, type, related_id, icon, badge, data } = await req.json() as NotificationPayload;

    console.log('Sending notification:', { title, body, type, related_id });

    // جلب جميع الاشتراكات النشطة
    const { data: subscriptions, error: subscriptionsError } = await supabase
      .from('push_subscriptions')
      .select('*')
      .eq('is_active', true);

    if (subscriptionsError) {
      console.error('Error fetching subscriptions:', subscriptionsError);
      throw subscriptionsError;
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log('No active subscriptions found');
      return new Response(
        JSON.stringify({ message: 'لا توجد اشتراكات نشطة', sent_count: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${subscriptions.length} active subscriptions`);

    // إرسال الإشعارات لجميع الاشتراكات
    const notificationPromises = subscriptions.map(async (subscription) => {
      try {
        const payload = {
          title,
          body,
          icon: icon || '/favicon.ico',
          badge: badge || '/favicon.ico',
          data: {
            type,
            related_id,
            ...data,
            url: type === 'product' ? '/' : '/',
            timestamp: new Date().toISOString()
          },
          actions: [
            {
              action: 'view',
              title: 'عرض'
            }
          ]
        };

        const response = await fetch(subscription.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'TTL': '86400', // 24 hours
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          console.error(`Failed to send to ${subscription.endpoint}:`, response.status, await response.text());
          // إذا فشل الإرسال، قم بتعطيل الاشتراك
          if (response.status === 410 || response.status === 404) {
            await supabase
              .from('push_subscriptions')
              .update({ is_active: false })
              .eq('id', subscription.id);
          }
          return false;
        }

        console.log(`Successfully sent notification to ${subscription.endpoint}`);
        return true;
      } catch (error) {
        console.error(`Error sending to ${subscription.endpoint}:`, error);
        return false;
      }
    });

    const results = await Promise.all(notificationPromises);
    const successCount = results.filter(Boolean).length;

    // تسجيل الإشعار في قاعدة البيانات
    const { error: logError } = await supabase
      .from('notifications_log')
      .insert({
        title,
        body,
        type,
        related_id,
        sent_to_count: successCount
      });

    if (logError) {
      console.error('Error logging notification:', logError);
    }

    console.log(`Notification sent successfully to ${successCount}/${subscriptions.length} subscribers`);

    return new Response(
      JSON.stringify({ 
        message: 'تم إرسال الإشعارات بنجاح', 
        sent_count: successCount,
        total_subscriptions: subscriptions.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-push-notification:', error);
    return new Response(
      JSON.stringify({ error: 'فشل في إرسال الإشعارات', details: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
