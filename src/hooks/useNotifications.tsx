
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa40HI80NhQW4WOlSkZM3FjpyZ-q5W7KkGVYe3WN1TJQZkmJ_NVkdVAWFfA02s';

export const useNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkNotificationSupport();
  }, []);

  const checkNotificationSupport = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      
      try {
        const registration = await navigator.serviceWorker.ready;
        const existingSubscription = await registration.pushManager.getSubscription();
        
        if (existingSubscription) {
          setSubscription(existingSubscription);
          setIsSubscribed(true);
        }
      } catch (error) {
        console.error('Error checking existing subscription:', error);
      }
    }
  };

  const requestPermission = async () => {
    if (!isSupported) {
      toast({
        title: 'غير مدعوم',
        description: 'متصفحك لا يدعم الإشعارات الفورية',
        variant: 'destructive',
      });
      return false;
    }

    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      toast({
        title: 'تم بنجاح',
        description: 'تم منح إذن الإشعارات',
      });
      return true;
    } else {
      toast({
        title: 'تم الرفض',
        description: 'لم يتم منح إذن الإشعارات',
        variant: 'destructive',
      });
      return false;
    }
  };

  const subscribe = async () => {
    setIsLoading(true);
    
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        setIsLoading(false);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      // حفظ الاشتراك في قاعدة البيانات
      const subscriptionData = {
        endpoint: newSubscription.endpoint,
        keys: {
          p256dh: arrayBufferToBase64(newSubscription.getKey('p256dh')),
          auth: arrayBufferToBase64(newSubscription.getKey('auth')),
        },
        user_agent: navigator.userAgent,
      };

      const { error } = await supabase
        .from('push_subscriptions')
        .insert([subscriptionData]);

      if (error) {
        console.error('Error saving subscription:', error);
        throw error;
      }

      setSubscription(newSubscription);
      setIsSubscribed(true);
      
      toast({
        title: 'تم الاشتراك',
        description: 'تم تفعيل الإشعارات الفورية بنجاح',
      });

    } catch (error) {
      console.error('Error subscribing to push notifications:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في تفعيل الإشعارات',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async () => {
    setIsLoading(true);
    
    try {
      if (subscription) {
        await subscription.unsubscribe();
        
        // حذف الاشتراك من قاعدة البيانات
        const { error } = await supabase
          .from('push_subscriptions')
          .delete()
          .eq('endpoint', subscription.endpoint);

        if (error) {
          console.error('Error removing subscription:', error);
        }
      }

      setSubscription(null);
      setIsSubscribed(false);
      
      toast({
        title: 'تم إلغاء الاشتراك',
        description: 'تم إيقاف الإشعارات الفورية',
      });

    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      toast({
        title: 'خطأ',
        description: 'فشل في إيقاف الإشعارات',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isSupported,
    isSubscribed,
    isLoading,
    subscribe,
    unsubscribe,
  };
};

// دوال مساعدة
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function arrayBufferToBase64(buffer: ArrayBuffer | null) {
  if (!buffer) return '';
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
