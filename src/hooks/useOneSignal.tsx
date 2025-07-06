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
    const initOneSignal = async () => {
      if (window.OneSignal) {
        try {
          await window.OneSignal.init({
            appId: "3c3da35a-91f0-4526-95d7-9799a3407583",
            notifyButton: {
              enable: false, // أو true لو حبيت زر الاشتراك يظهر في الصفحة
            },
            allowLocalhostAsSecureOrigin: true, // مهم أثناء التطوير المحلي
          });

          console.log("✅ OneSignal initialized successfully");

          const isEnabled = await window.OneSignal.isPushNotificationsEnabled();
          console.log("🔔 Subscription status:", isEnabled);
          setIsSubscribed(isEnabled);
          setIsInitialized(true);

          // استمع لتغييرات حالة الاشتراك
          window.OneSignal.on('subscriptionChange', (status: boolean) => {
            console.log("📡 Subscription changed:", status);
            setIsSubscribed(status);
          });
        } catch (error) {
          console.error("❌ Error initializing OneSignal:", error);
          setIsInitialized(true);
        }
      }
    };

    if (window.OneSignal) {
      console.log("🔄 OneSignal already loaded");
      initOneSignal();
    } else {
      console.log("⏳ Waiting for OneSignal to load...");
      const checkOneSignal = setInterval(() => {
        if (window.OneSignal) {
          console.log("✅ OneSignal loaded via interval");
          clearInterval(checkOneSignal);
          initOneSignal();
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkOneSignal);
        if (!window.OneSignal) {
          console.warn("⚠️ OneSignal failed to load after timeout");
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
      console.error("❌ Error requesting notification permission:", error);
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
      console.error("❌ Error getting user ID:", error);
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
