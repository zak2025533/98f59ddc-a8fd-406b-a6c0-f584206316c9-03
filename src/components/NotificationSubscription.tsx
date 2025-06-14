
import { Bell, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';

const NotificationSubscription = () => {
  const { isSupported, isSubscribed, isLoading, subscribe, unsubscribe } = useNotifications();

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      onClick={isSubscribed ? unsubscribe : subscribe}
      disabled={isLoading}
      variant={isSubscribed ? "secondary" : "default"}
      size="sm"
      className="font-arabic"
    >
      {isSubscribed ? (
        <>
          <BellRing className="h-4 w-4 ml-2" />
          إيقاف الإشعارات
        </>
      ) : (
        <>
          <Bell className="h-4 w-4 ml-2" />
          تفعيل الإشعارات
        </>
      )}
    </Button>
  );
};

export default NotificationSubscription;
