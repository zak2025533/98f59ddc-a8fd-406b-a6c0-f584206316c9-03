
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface Announcement {
  id: string;
  title: string;
  description: string | null;
  type: string;
  product_id: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  image_url: string | null;
  video_url: string | null;
  banner_text: string | null;
  is_active: boolean;
  is_banner: boolean | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  products?: {
    name: string;
  };
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('announcements')
        .select(`
          *,
          products:product_id (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب الإعلانات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الإعلان بنجاح",
      });

      fetchAnnouncements();
      return true;
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف الإعلان",
        variant: "destructive",
      });
      return false;
    }
  };

  const toggleAnnouncementStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم التحديث بنجاح",
        description: `تم ${!currentStatus ? 'تفعيل' : 'إيقاف'} الإعلان بنجاح`,
      });

      fetchAnnouncements();
    } catch (error) {
      console.error('Error toggling announcement status:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث حالة الإعلان",
        variant: "destructive",
      });
    }
  };

  const sendNotificationForAnnouncement = async (announcement: any) => {
    try {
      console.log('Sending notification for announcement:', announcement);
      const { error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          title: 'إعلان جديد!',
          body: announcement.title,
          type: 'announcement',
          related_id: announcement.id
        }
      });

      if (error) {
        console.error('Error sending notification:', error);
      } else {
        console.log('Notification sent successfully');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    announcements,
    loading,
    fetchAnnouncements,
    deleteAnnouncement,
    toggleAnnouncementStatus,
    sendNotificationForAnnouncement,
  };
};
