
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

  const playNotificationSound = (type: string = 'default') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // أصوات مختلفة حسب نوع الإشعار
      const frequencies: { [key: string]: number[] } = {
        success: [800, 1000],
        warning: [400, 300],
        error: [200, 150],
        info: [600, 700],
        default: [800, 600]
      };
      
      const [freq1, freq2] = frequencies[type] || frequencies.default;
      
      oscillator.frequency.setValueAtTime(freq1, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(freq2, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } catch (error) {
      console.log('تعذر تشغيل الصوت:', error);
    }
  };

  const sendGlobalNotification = (title: string, description: string, type: string = 'general') => {
    console.log('Sending global notification:', { title, description, type });
    
    // إرسال إشعار عبر CustomEvent للمكون الجديد
    const event = new CustomEvent('newNotification', {
      detail: { title, description, type }
    });
    window.dispatchEvent(event);
  };

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

      playNotificationSound('success');

      sendGlobalNotification(
        "تم تفعيل الإشعارات",
        "ستتلقى إشعارات عند إضافة منتجات أو إعلانات جديدة",
        "success"
      );
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
    // إرسال إشعار تجريبي متقدم
    playNotificationSound('info');
    
    toast.info("إشعار تجريبي محسّن", {
      description: "النظام يعمل بكفاءة عالية مع الأصوات والألوان الجديدة",
      duration: 5000,
      action: {
        label: "رائع!",
        onClick: () => console.log("Test notification acknowledged"),
      },
    });

    sendGlobalNotification(
      "إشعار تجريبي محسّن",
      "النظام يعمل بكفاءة عالية مع جميع الميزات الجديدة",
      "info"
    );

    shadcnToast({
      title: "تم الإرسال",
      description: "تم إرسال إشعار تجريبي داخلي محسّن",
    });
  };

  const sendNotificationForAnnouncement = (announcement: any) => {
    console.log('Sending notification for announcement:', announcement);
    
    // إرسال الإشعار دائماً بدون التحقق من التفعيل
    playNotificationSound('info');
    
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

    sendGlobalNotification(
      "إعلان جديد!",
      announcement.title,
      "announcement"
    );
  };

  const sendNotificationForProduct = (product: any) => {
    console.log('Sending notification for product:', product);
    
    if (!product || !product.name) {
      console.error('Invalid product data for notification:', product);
      return;
    }
    
    // إرسال الإشعار دائماً بدون التحقق من التفعيل
    playNotificationSound('success');
    
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

    sendGlobalNotification(
      "منتج جديد!",
      `تم إضافة منتج جديد: ${product.name}`,
      "product"
    );
  };

  // إشعارات متقدمة جديدة
  const sendOrderNotification = (order: any) => {
    playNotificationSound('default');
    
    toast("طلب جديد!", {
      description: `تم استلام طلب رقم #${order.id}`,
      duration: 6000,
      action: {
        label: "عرض الطلب",
        onClick: () => console.log("Viewing order:", order.id),
      },
    });

    sendGlobalNotification(
      "طلب جديد!",
      `تم استلام طلب رقم #${order.id}`,
      "order"
    );
  };

  const sendWarningNotification = (title: string, description: string) => {
    playNotificationSound('warning');
    
    toast.error(title, {
      description,
      duration: 8000,
      action: {
        label: "عرض التفاصيل",
        onClick: () => console.log("Warning details requested"),
      },
    });

    sendGlobalNotification(title, description, "warning");
  };

  return {
    isEnabled,
    loading,
    enableInternalNotifications,
    disableInternalNotifications,
    sendTestNotification,
    sendNotificationForAnnouncement,
    sendNotificationForProduct,
    sendOrderNotification,
    sendWarningNotification,
    sendGlobalNotification,
    playNotificationSound,
  };
};
