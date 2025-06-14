
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationToggleProps {
  isSubscribed: boolean;
  loading: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
}

const NotificationToggle = ({ 
  isSubscribed, 
  loading, 
  onSubscribe, 
  onUnsubscribe 
}: NotificationToggleProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Label className="font-arabic">تفعيل الإشعارات الخارجية</Label>
        <p className="text-sm text-muted-foreground font-arabic">
          ستتلقى إشعارات عند إضافة منتجات أو إعلانات جديدة
        </p>
      </div>
      <Switch
        checked={isSubscribed}
        onCheckedChange={isSubscribed ? onUnsubscribe : onSubscribe}
        disabled={loading}
      />
    </div>
  );
};

export default NotificationToggle;
