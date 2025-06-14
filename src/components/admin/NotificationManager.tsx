
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, BellOff, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NotificationManager = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkNotificationSupport();
    checkCurrentSubscription();
  }, []);

  const checkNotificationSupport = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  };

  const checkCurrentSubscription = async () => {
    if (!('serviceWorker' in navigator)) return;

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      toast({
        title: "غير مدعوم",
        description: "متصفحك لا يدعم الإشعارات",
        variant: "destructive",
      });
      return false;
    }

    const permission = await Notification.requestPermission();
    setPermission(permission);

    if (permission === 'granted') {
      toast({
        title: "تم منح الإذن",
        description: "يمكنك الآن تلقي الإشعارات",
      });
      return true;
    } else {
      toast({
        title: "تم رفض الإذن",
        description: "لن تتمكن من تلقي الإشعارات",
        variant: "destructive",
      });
      return false;
    }
  };

  const subscribeToNotifications = async () => {
    if (permission !== 'granted') {
      const granted = await requestPermission();
      if (!granted) return;
    }

    setLoading(true);

    try {
      // تسجيل service worker
      let registration;
      try {
        registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        console.log('Service Worker registered successfully:', registration);
      } catch (swError) {
        console.error('Service Worker registration failed:', swError);
        throw new Error('فشل في تسجيل Service Worker');
      }
      
      // انتظار تحميل service worker
      if (registration.installing) {
        await new Promise((resolve) => {
          registration.installing.addEventListener('statechange', function() {
            if (this.state === 'activated') {
              resolve(void 0);
            }
          });
        });
      }

      // التحقق من وجود service worker نشط
      if (!registration.active) {
        throw new Error('Service Worker ليس نشطًا');
      }

      // إنشاء اشتراك push مع مفتاح VAPID صالح
      const vapidKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI_8U8-L5YMOFYZzkfRGh4NPSe_oBuYJKcOgGYF7I1a7dCt7g_m1l2XXZE';
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey
      });

      console.log('Push subscription created:', subscription);

      // حفظ الاشتراك في قاعدة البيانات
      const subscriptionData = {
        endpoint: subscription.endpoint,
        keys: subscription.toJSON().keys,
        user_agent: navigator.userAgent
      };

      console.log('Saving subscription to database:', subscriptionData);

      const { error } = await supabase
        .from('push_subscriptions')
        .insert(subscriptionData);

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      setIsSubscribed(true);
      toast({
        title: "تم الاشتراك بنجاح",
        description: "ستتلقى إشعارات عند إضافة منتجات أو إعلانات جديدة",
      });

    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      toast({
        title: "خطأ في الاشتراك",
        description: error.message || "تعذر الاشتراك في الإشعارات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const unsubscribeFromNotifications = async () => {
    setLoading(true);

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
          await subscription.unsubscribe();

          // إلغاء تفعيل الاشتراك في قاعدة البيانات
          const { error } = await supabase
            .from('push_subscriptions')
            .update({ is_active: false })
            .eq('endpoint', subscription.endpoint);

          if (error) throw error;
        }
      }

      setIsSubscribed(false);
      toast({
        title: "تم إلغاء الاشتراك",
        description: "لن تتلقى المزيد من الإشعارات",
      });

    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast({
        title: "خطأ",
        description: "تعذر إلغاء الاشتراك",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendTestNotification = async () => {
    try {
      console.log('Sending test notification...');
      const { error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          title: 'إشعار تجريبي',
          body: 'هذا إشعار تجريبي للتأكد من عمل النظام',
          type: 'general'
        }
      });

      if (error) {
        console.error('Test notification error:', error);
        throw error;
      }

      toast({
        title: "تم الإرسال",
        description: "تم إرسال إشعار تجريبي",
      });
    } catch (error) {
      console.error('Error sending test notification:', error);
      toast({
        title: "خطأ",
        description: "تعذر إرسال الإشعار التجريبي",
        variant: "destructive",
      });
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
            <BellOff className="h-5 w-5" />
            إدارة الإشعارات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground font-arabic">
            متصفحك لا يدعم الإشعارات الخارجية
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          إدارة الإشعارات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-arabic">تفعيل الإشعارات الخارجية</Label>
            <p className="text-sm text-muted-foreground font-arabic">
              ستتلقى إشعارات عند إضافة منتجات أو إعلانات جديدة
            </p>
          </div>
          <Switch
            checked={isSubscribed}
            onCheckedChange={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
            disabled={loading}
          />
        </div>

        {permission === 'denied' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 font-arabic">
              تم منع الإشعارات. يرجى السماح بالإشعارات من إعدادات المتصفح.
            </p>
          </div>
        )}

        {isSubscribed && (
          <div className="flex gap-2">
            <Button
              onClick={sendTestNotification}
              variant="outline"
              className="font-arabic"
            >
              <Send className="h-4 w-4 ml-2" />
              إرسال إشعار تجريبي
            </Button>
          </div>
        )}

        <div className="text-sm text-muted-foreground font-arabic">
          <p><strong>حالة الإذن:</strong> {permission === 'granted' ? 'مُفعّل' : permission === 'denied' ? 'مرفوض' : 'في الانتظار'}</p>
          <p><strong>حالة الاشتراك:</strong> {isSubscribed ? 'مشترك' : 'غير مشترك'}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationManager;
