
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bell, 
  Send, 
  Users, 
  CheckCircle, 
  XCircle,
  BarChart3
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NotificationStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalNotificationsSent: number;
  recentNotifications: any[];
}

const NotificationsAnalytics = () => {
  const [stats, setStats] = useState<NotificationStats>({
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    totalNotificationsSent: 0,
    recentNotifications: [],
  });
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    title: "",
    body: "",
    type: "general",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchNotificationStats();
  }, []);

  const fetchNotificationStats = async () => {
    try {
      setLoading(true);

      // إحصائيات الاشتراكات
      const { data: subscriptions, error: subsError } = await supabase
        .from('push_subscriptions')
        .select('id, is_active');

      if (subsError) throw subsError;

      const totalSubscriptions = subscriptions?.length || 0;
      const activeSubscriptions = subscriptions?.filter(s => s.is_active).length || 0;

      // إحصائيات الإشعارات المرسلة
      const { data: notifications, error: notifError } = await supabase
        .from('notifications_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (notifError) throw notifError;

      const totalNotificationsSent = notifications?.reduce((sum, n) => sum + (n.sent_to_count || 0), 0) || 0;

      setStats({
        totalSubscriptions,
        activeSubscriptions,
        totalNotificationsSent,
        recentNotifications: notifications || [],
      });
    } catch (error) {
      console.error('Error fetching notification stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendNotification = async () => {
    if (!notificationForm.title.trim() || !notificationForm.body.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال عنوان ونص الإشعار",
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          title: notificationForm.title,
          body: notificationForm.body,
          type: notificationForm.type,
        }
      });

      if (error) throw error;

      toast({
        title: "تم الإرسال",
        description: `تم إرسال الإشعار إلى ${data.sent_count} مشترك`,
      });

      setNotificationForm({ title: "", body: "", type: "general" });
      fetchNotificationStats();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "فشل في إرسال الإشعار",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* إحصائيات الإشعارات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-600 font-arabic">
                  إجمالي المشتركين
                </p>
                <p className="text-2xl font-bold text-blue-800 font-arabic">
                  {stats.totalSubscriptions}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-green-600 font-arabic">
                  المشتركين النشطين
                </p>
                <p className="text-2xl font-bold text-green-800 font-arabic">
                  {stats.activeSubscriptions}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-purple-600 font-arabic">
                  إجمالي الإشعارات المرسلة
                </p>
                <p className="text-2xl font-bold text-purple-800 font-arabic">
                  {stats.totalNotificationsSent}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* إرسال إشعار جديد */}
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
        <CardHeader>
          <CardTitle className="text-right font-arabic text-orange-800 flex items-center gap-2">
            <Send className="h-5 w-5" />
            إرسال إشعار جديد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-right font-arabic">عنوان الإشعار</Label>
            <Input
              id="title"
              value={notificationForm.title}
              onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="أدخل عنوان الإشعار"
              className="text-right font-arabic"
            />
          </div>

          <div>
            <Label htmlFor="body" className="text-right font-arabic">نص الإشعار</Label>
            <Textarea
              id="body"
              value={notificationForm.body}
              onChange={(e) => setNotificationForm(prev => ({ ...prev, body: e.target.value }))}
              placeholder="أدخل نص الإشعار"
              className="text-right font-arabic"
              rows={3}
            />
          </div>

          <Button 
            onClick={sendNotification} 
            disabled={sending}
            className="w-full font-arabic bg-orange-600 hover:bg-orange-700"
          >
            {sending ? "جاري الإرسال..." : "إرسال الإشعار"}
          </Button>
        </CardContent>
      </Card>

      {/* سجل الإشعارات الأخيرة */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="text-right font-arabic text-gray-800 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            آخر الإشعارات المرسلة
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentNotifications.length === 0 ? (
            <p className="text-center text-gray-500 font-arabic py-4">لا توجد إشعارات مرسلة</p>
          ) : (
            <div className="space-y-3">
              {stats.recentNotifications.map((notification) => (
                <div key={notification.id} className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 font-arabic">{notification.title}</h4>
                      <p className="text-sm text-gray-600 font-arabic mt-1">{notification.body}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="font-arabic">تم الإرسال إلى: {notification.sent_to_count} مشترك</span>
                        <span className="font-arabic">
                          {new Date(notification.created_at).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded font-arabic">
                      {notification.type === 'general' ? 'عام' : 
                       notification.type === 'product' ? 'منتج' : 'إعلان'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsAnalytics;
