import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const usePushNotifications = () => {
  const { toast } = useToast();

  const sendPushNotification = async (title: string, message: string, segment = "All") => {
    try {
      console.log("Sending push notification:", { title, message, segment });

      const { data, error } = await supabase.functions.invoke('send-push', {
        body: {
          title,
          message,
          segment
        }
      });

      if (error) {
        console.error('Error invoking push function:', error);
        toast({
          title: "خطأ في الإشعار",
          description: "فشل في إرسال الإشعار",
          variant: "destructive",
        });
        return false;
      }

      if (data?.success) {
        console.log("Push notification sent successfully:", data);
        toast({
          title: "تم الإرسال",
          description: "تم إرسال الإشعار بنجاح",
        });
        return true;
      } else {
        console.error("Push notification failed:", data);
        toast({
          title: "خطأ في الإشعار",
          description: data?.error || "فشل في إرسال الإشعار",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Push notification error:', error);
      toast({
        title: "خطأ في الإشعار",
        description: "حدث خطأ أثناء إرسال الإشعار",
        variant: "destructive",
      });
      return false;
    }
  };

  const sendNewProductNotification = async (productName: string, productPrice: number) => {
    const title = "منتج جديد! 🎉";
    const message = `تم إضافة منتج جديد: ${productName} بسعر ${productPrice} ريال يمني`;
    return await sendPushNotification(title, message);
  };

  const sendCustomNotification = async (title: string, message: string) => {
    return await sendPushNotification(title, message);
  };

  return {
    sendPushNotification,
    sendNewProductNotification,
    sendCustomNotification,
  };
};