
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BellOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useInternalNotifications } from "@/hooks/useInternalNotifications";

const InternalNotificationManager = () => {
  const {
    isEnabled,
    loading,
    enableInternalNotifications,
    disableInternalNotifications,
    sendTestNotification,
  } = useInternalNotifications();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
          {isEnabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          إدارة الإشعارات الداخلية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* مفتاح التفعيل */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="font-arabic">تفعيل الإشعارات الداخلية</Label>
            <p className="text-sm text-muted-foreground font-arabic">
              ستتلقى إشعارات داخل التطبيق عند إضافة منتجات أو إعلانات جديدة
            </p>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={isEnabled ? disableInternalNotifications : enableInternalNotifications}
            disabled={loading}
          />
        </div>

        {/* زر الإشعار التجريبي */}
        {isEnabled && (
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

        {/* معلومات الحالة */}
        <div className="text-sm text-muted-foreground font-arabic">
          <p><strong>حالة الإشعارات:</strong> {isEnabled ? 'مُفعّلة' : 'معطلة'}</p>
          <p><strong>النوع:</strong> إشعارات داخلية</p>
        </div>

        {/* رسالة توضيحية */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 font-arabic">
            الإشعارات الداخلية تظهر داخل التطبيق فقط ولا تحتاج لأذونات خاصة من المتصفح.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternalNotificationManager;
