
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Package, 
  Megaphone, 
  ShoppingCart, 
  Star, 
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Gift
} from "lucide-react";
import { useInternalNotifications } from "@/hooks/useInternalNotifications";
import { toast } from "sonner";

const NotificationTester = () => {
  const { sendGlobalNotification } = useInternalNotifications();

  const testNotifications = [
    {
      id: 'product',
      title: 'منتج جديد',
      description: 'تم إضافة كعكة الشوكولاتة الفاخرة',
      type: 'product',
      icon: Package,
      color: 'bg-blue-50 border-blue-200',
      sound: true
    },
    {
      id: 'announcement', 
      title: 'إعلان مهم',
      description: 'خصم 30% على جميع الحلويات هذا الأسبوع',
      type: 'announcement',
      icon: Megaphone,
      color: 'bg-orange-50 border-orange-200',
      sound: true
    },
    {
      id: 'order',
      title: 'طلب جديد',
      description: 'تم استلام طلب رقم #12345',
      type: 'order', 
      icon: ShoppingCart,
      color: 'bg-green-50 border-green-200',
      sound: true
    },
    {
      id: 'review',
      title: 'تقييم جديد',
      description: 'حصلت على تقييم 5 نجوم من أحمد محمد',
      type: 'review',
      icon: Star,
      color: 'bg-yellow-50 border-yellow-200',
      sound: false
    },
    {
      id: 'warning',
      title: 'تحذير المخزون',
      description: 'مخزون الكنافة النابلسية منخفض (3 قطع متبقية)',
      type: 'warning',
      icon: AlertCircle,
      color: 'bg-red-50 border-red-200',
      sound: true
    },
    {
      id: 'success',
      title: 'نجح العملية',
      description: 'تم تحديث بيانات المتجر بنجاح',
      type: 'success',
      icon: CheckCircle,
      color: 'bg-emerald-50 border-emerald-200',
      sound: false
    },
    {
      id: 'info',
      title: 'معلومة عامة',
      description: 'سيتم إجراء صيانة للنظام غداً من 2-4 صباحاً',
      type: 'info',
      icon: Info,
      color: 'bg-cyan-50 border-cyan-200',
      sound: false
    },
    {
      id: 'promotion',
      title: 'عرض خاص',
      description: 'اشتري 2 واحصل على الثالث مجاناً!',
      type: 'promotion',
      icon: Gift,
      color: 'bg-purple-50 border-purple-200',
      sound: true
    }
  ];

  const playNotificationSound = () => {
    // إنشاء صوت إشعار بسيط
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const sendTestNotification = (notification: any) => {
    // تشغيل الصوت إذا كان مفعلاً
    if (notification.sound) {
      playNotificationSound();
    }

    // إرسال toast notification
    if (notification.type === 'warning') {
      toast.error(notification.title, {
        description: notification.description,
        duration: 5000,
        action: {
          label: "عرض التفاصيل",
          onClick: () => console.log("Viewing details for:", notification.id),
        },
      });
    } else if (notification.type === 'success') {
      toast.success(notification.title, {
        description: notification.description,
        duration: 3000,
      });
    } else if (notification.type === 'info') {
      toast.info(notification.title, {
        description: notification.description,
        duration: 4000,
      });
    } else {
      toast(notification.title, {
        description: notification.description,
        duration: 4000,
        action: {
          label: "عرض",
          onClick: () => console.log("Viewing:", notification.id),
        },
      });
    }

    // إرسال إشعار داخلي
    sendGlobalNotification(
      notification.title,
      notification.description,
      notification.type
    );
  };

  const sendAllNotifications = () => {
    testNotifications.forEach((notification, index) => {
      setTimeout(() => {
        sendTestNotification(notification);
      }, index * 1000); // إرسال كل إشعار بفاصل ثانية واحدة
    });
  };

  const sendRandomNotification = () => {
    const randomNotification = testNotifications[Math.floor(Math.random() * testNotifications.length)];
    sendTestNotification(randomNotification);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
          <Zap className="h-5 w-5" />
          اختبار الإشعارات المطور
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* أزرار التحكم السريع */}
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={sendAllNotifications}
            className="font-arabic bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Bell className="h-4 w-4 ml-2" />
            اختبار جميع الأنواع
          </Button>
          <Button
            onClick={sendRandomNotification}
            variant="outline"
            className="font-arabic"
          >
            <Zap className="h-4 w-4 ml-2" />
            إشعار عشوائي
          </Button>
        </div>

        {/* بطاقات الإشعارات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card 
                key={notification.id} 
                className={`${notification.color} border-2 hover:shadow-md transition-all duration-200`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge 
                      variant="secondary" 
                      className="font-arabic text-xs"
                    >
                      {notification.type}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {notification.sound && (
                        <Badge variant="outline" className="text-xs">
                          🔊
                        </Badge>
                      )}
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 font-arabic mb-2 text-right">
                    {notification.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 font-arabic mb-3 text-right">
                    {notification.description}
                  </p>
                  
                  <Button
                    onClick={() => sendTestNotification(notification)}
                    size="sm"
                    variant="outline"
                    className="w-full font-arabic"
                  >
                    إرسال هذا الإشعار
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* معلومات النظام */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 font-arabic mb-2">
            ميزات النظام المطور:
          </h4>
          <ul className="text-sm text-green-700 font-arabic space-y-1">
            <li>• 8 أنواع مختلفة من الإشعارات</li>
            <li>• أصوات تنبيه للإشعارات المهمة</li>
            <li>• ألوان مميزة لكل نوع</li>
            <li>• إشعارات فورية وداخلية</li>
            <li>• حفظ تلقائي في التخزين المحلي</li>
            <li>• عدادات غير مقروءة</li>
            <li>• أزرار تفاعلية للإجراءات</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationTester;
