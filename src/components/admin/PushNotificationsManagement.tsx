import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bell, Send, Sparkles } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";

const PushNotificationsManagement = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { sendCustomNotification } = usePushNotifications();

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim()) {
      return;
    }

    setIsLoading(true);
    
    const success = await sendCustomNotification(title.trim(), message.trim());
    
    if (success) {
      setTitle("");
      setMessage("");
    }
    
    setIsLoading(false);
  };

  const quickMessages = [
    {
      title: "عروض خاصة! 🎉",
      message: "تخفيضات هائلة على جميع المنتجات المميزة. لا تفوت الفرصة!"
    },
    {
      title: "منتجات جديدة وصلت! ✨",
      message: "اكتشف أحدث منتجاتنا المضافة حديثاً بأفضل الأسعار"
    },
    {
      title: "تذكير مهم! ⏰",
      message: "عرض محدود الوقت ينتهي قريباً. اطلب الآن!"
    }
  ];

  const useQuickMessage = (quickMsg: typeof quickMessages[0]) => {
    setTitle(quickMsg.title);
    setMessage(quickMsg.message);
  };

  return (
    <Card className="bg-white border-2 border-blue-300">
      <CardHeader className="bg-blue-50 border-b border-blue-200">
        <CardTitle className="font-arabic text-right flex items-center gap-2 text-blue-800">
          <Bell className="h-5 w-5" />
          إدارة الإشعارات المباشرة
        </CardTitle>
        <p className="text-sm text-blue-600 font-arabic text-right">
          أرسل إشعارات مباشرة لجميع المشتركين في الموقع
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* رسائل سريعة */}
        <div className="mb-6">
          <Label className="text-sm font-semibold font-arabic text-gray-700 mb-3 block text-right">
            رسائل سريعة جاهزة:
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {quickMessages.map((quickMsg, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => useQuickMessage(quickMsg)}
                className="p-3 h-auto text-right font-arabic border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="text-right">
                  <div className="font-semibold text-sm text-blue-700 mb-1">
                    {quickMsg.title}
                  </div>
                  <div className="text-xs text-gray-600 line-clamp-2">
                    {quickMsg.message}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* نموذج الإشعار */}
        <form onSubmit={handleSendNotification} className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-sm font-semibold font-arabic text-gray-700 text-right block mb-2">
              عنوان الإشعار *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="اكتب عنوان الإشعار..."
              className="text-right font-arabic border-2 border-gray-300 focus:border-blue-500"
              maxLength={50}
              required
            />
            <p className="text-xs text-gray-500 font-arabic text-right mt-1">
              {title.length}/50 حرف
            </p>
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-semibold font-arabic text-gray-700 text-right block mb-2">
              نص الرسالة *
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب نص الإشعار..."
              className="text-right font-arabic border-2 border-gray-300 focus:border-blue-500 min-h-[100px] resize-none"
              maxLength={150}
              required
            />
            <p className="text-xs text-gray-500 font-arabic text-right mt-1">
              {message.length}/150 حرف
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => { setTitle(""); setMessage(""); }}
              className="font-arabic border-2 border-gray-300 hover:bg-gray-50"
              disabled={isLoading}
            >
              مسح الحقول
            </Button>
            
            <Button
              type="submit"
              disabled={isLoading || !title.trim() || !message.trim()}
              className="font-arabic bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex-1"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 ml-2" />
                  إرسال الإشعار
                </>
              )}
            </Button>
          </div>
        </form>

        {/* معلومات إضافية */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Sparkles className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-right">
              <h4 className="font-semibold font-arabic text-amber-800 mb-2">
                نصائح لكتابة إشعارات فعّالة:
              </h4>
              <ul className="text-sm font-arabic text-amber-700 space-y-1">
                <li>• استخدم عناوين جذابة وقصيرة</li>
                <li>• اذكر الفائدة أو العرض بوضوح</li>
                <li>• أضف رموز تعبيرية لجذب الانتباه</li>
                <li>• حدد وقت العرض إذا كان محدوداً</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PushNotificationsManagement;