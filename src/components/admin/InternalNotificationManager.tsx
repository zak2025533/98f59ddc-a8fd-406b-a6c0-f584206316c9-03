
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useInternalNotifications } from "@/hooks/useInternalNotifications";

const InternalNotificationManager = () => {
  const { sendTestNotification } = useInternalNotifications();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          إدارة الإشعارات الداخلية
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* رسالة تأكيدية */}
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-green-800 font-arabic font-semibold">
              الإشعارات الداخلية مفعلة تلقائياً
            </p>
            <p className="text-sm text-green-700 font-arabic">
              جميع المستخدمين سيتلقون إشعارات داخل التطبيق عند إضافة منتجات أو إعلانات جديدة
            </p>
          </div>
        </div>

        {/* زر الإشعار التجريبي */}
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

        {/* معلومات الحالة */}
        <div className="text-sm text-muted-foreground font-arabic space-y-2">
          <p><strong>حالة النظام:</strong> مفعل ويعمل تلقائياً</p>
          <p><strong>النوع:</strong> إشعارات داخلية بدون أذونات</p>
          <p><strong>التغطية:</strong> جميع المستخدمين</p>
        </div>

        {/* رسالة توضيحية محدثة */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 font-arabic">
            الإشعارات الداخلية تعمل الآن تلقائياً لجميع المستخدمين ولا تحتاج لأذونات من المتصفح. 
            سيتم إرسال إشعارات فورية داخل التطبيق عند إضافة منتجات أو إعلانات جديدة.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InternalNotificationManager;
