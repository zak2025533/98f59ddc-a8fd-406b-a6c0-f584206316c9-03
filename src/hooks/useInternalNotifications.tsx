
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const useInternalNotifications = () => {
  // تفعيل الإشعارات افتراضياً لجميع المستخدمين
  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast: shadcnToast } = useToast();

  useEffect(() => {
    // تفعيل الإشعارات تلقائياً عند تحميل التطبيق
    const savedState = localStorage.getItem('internal_notifications_enabled');
    if (savedState === null) {
      // إذا لم يتم تعيين حالة من قبل، فعّل الإشعارات تلقائياً
      localStorage.setItem('internal_notifications_enabled', 'true');
      setIsEnabled(true);
    } else {
      setIsEnabled(savedState === 'true');
    }
  }, []);

  const enableInternalNotifications = () => {
    setLoading(true);
    try {
      localStorage.setItem('internal_notifications_enabled', 'true');
      setIsEnabled(true);
      
      shadcnToast({
        title: "تم التفعيل",
        description: "تم تفعيل الإشعارات الداخلية بنجاح",
      });

      // إشعار ترحيبي
      toast.success("مرحباً! تم تفعيل الإشعارات الداخلية", {
        description: "ستتلقى إشعارات داخل التطبيق عند إضافة منتجات أو إعلانات جديدة",
        duration: 4000,
      });
    } catch (error) {
      console.error('Error enabling internal notifications:', error);
      shadcnToast({
        title: "خطأ",
        description: "حدث خطأ أثناء تفعيل الإشعارات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const disableInternalNotifications = () => {
    setLoading(true);
    try {
      localStorage.setItem('internal_notifications_enabled', 'false');
      setIsEnabled(false);
      
      shadcnToast({
        title: "تم الإيقاف",
        description: "تم إيقاف الإشعارات الداخلية",
      });
    } catch (error) {
      console.error('Error disabling internal notifications:', error);
      shadcnToast({
        title: "خطأ",
        description: "حدث خطأ أثناء إيقاف الإشعارات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendTestNotification = () => {
    if (!isEnabled) {
      shadcnToast({
        title: "الإشعارات معطلة",
        description: "يرجى تفعيل الإشعارات الداخلية أولاً",
        variant: "destructive",
      });
      return;
    }

    // إرسال إشعار تجريبي
    toast.info("إشعار تجريبي", {
      description: "هذا إشعار تجريبي للتأكد من عمل النظام الداخلي",
      duration: 5000,
      action: {
        label: "موافق",
        onClick: () => console.log("Test notification acknowledged"),
      },
    });

    shadcnToast({
      title: "تم الإرسال",
      description: "تم إرسال إشعار تجريبي داخلي",
    });
  };

  const sendNotificationForAnnouncement = (announcement: any) => {
    // إرسال الإشعار دائماً بدون التحقق من التفعيل
    toast.success("إعلان جديد!", {
      description: announcement.title,
      duration: 6000,
      action: {
        label: "عرض",
        onClick: () => {
          console.log("Viewing announcement:", announcement.id);
        },
      },
    });
  };

  const sendNotificationForProduct = (product: any) => {
    // إرسال الإشعار دائماً بدون التحقق من التفعيل
    toast.success("منتج جديد!", {
      description: `تم إضافة منتج جديد: ${product.name}`,
      duration: 6000,
      action: {
        label: "عرض",
        onClick: () => {
          console.log("Viewing product:", product.id);
        },
      },
    });
  };

  return {
    isEnabled,
    loading,
    enableInternalNotifications,
    disableInternalNotifications,
    sendTestNotification,
    sendNotificationForAnnouncement,
    sendNotificationForProduct,
  };
};
