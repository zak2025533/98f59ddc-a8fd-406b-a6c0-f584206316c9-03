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
        window.OneSignal.isPushNotificationsEnabled().then((isEnabled: boolean) => {
          setIsSubscribed(isEnabled);
          setIsInitialized(true);
        });

        // استمع لتغييرات حالة الاشتراك
        window.OneSignal.on('subscriptionChange', (isSubscribed: boolean) => {
          setIsSubscribed(isSubscribed);
        });
      }
    };

    // إذا كان OneSignal محمل بالفعل
    if (window.OneSignal) {
      initOneSignal();
    } else {
      // انتظر حتى يتم تحميل OneSignal
      const checkOneSignal = setInterval(() => {
        if (window.OneSignal) {
          clearInterval(checkOneSignal);
          initOneSignal();
        }
      }, 100);

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