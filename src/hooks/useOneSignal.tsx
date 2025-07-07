import { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    OneSignal?: any;
    OneSignalDeferred?: any[];
  }
}

export const useOneSignal = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const initOneSignal = () => {
      if (window.OneSignal) {
        console.log('OneSignal initialized successfully');
        window.OneSignal.isPushNotificationsEnabled().then((isEnabled: boolean) => {
          console.log('OneSignal subscription status:', isEnabled);
          setIsSubscribed(isEnabled);
          setIsInitialized(true);
        }).catch((error: any) => {
          console.error('Error checking OneSignal status:', error);
          setIsInitialized(true);
        });

        // استمع لتغييرات حالة الاشتراك
        window.OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
          console.log('OneSignal subscription changed:', isSubscribed);
          setIsSubscribed(isSubscribed);
        });
      }
    };

    // إذا كان OneSignal محمل بالفعل
    if (window.OneSignal) {
      console.log('OneSignal already loaded');
      initOneSignal();
    } else {
      // انتظر حتى يتم تحميل OneSignal
      console.log('Waiting for OneSignal to load...');
      const checkOneSignal = setInterval(() => {
        if (window.OneSignal) {
          console.log('OneSignal loaded via interval check');
          clearInterval(checkOneSignal);
          initOneSignal();
        }
      }, 100);

      // أضف timeout للتأكد من عدم الانتظار إلى ما لا نهاية
      setTimeout(() => {
        clearInterval(checkOneSignal);
        if (!window.OneSignal) {
          console.warn('OneSignal failed to load after timeout');
          setIsInitialized(true);
        }
      }, 10000);

      return () => clearInterval(checkOneSignal);
    }
  }, []);

  const requestPermission = async () => {
    try {
      if (!window.OneSignal) {
        toast({
          title: "خطأ",
          description: "خدمة الإشعارات غير متاحة",
          variant: "destructive",
        });
        return false;
      }

      const permission = await window.OneSignal.showNativePrompt();
      if (permission) {
        setIsSubscribed(true);
        toast({
          title: "تم بنجاح",
          description: "تم تفعيل الإشعارات بنجاح",
        });
        return true;
      } else {
        toast({
          title: "تم الإلغاء",
          description: "تم إلغاء تفعيل الإشعارات",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء طلب إذن الإشعارات",
        variant: "destructive",
      });
      return false;
    }
  };

  const getUserId = async () => {
    if (!window.OneSignal) return null;
    try {
      return await window.OneSignal.getUserId();
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  };

  return {
    isInitialized,
    isSubscribed,
    requestPermission,
    getUserId,
  };
};