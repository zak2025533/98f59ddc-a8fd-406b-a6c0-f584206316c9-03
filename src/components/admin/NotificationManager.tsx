
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationToggle from "./NotificationToggle";
import NotificationStatus from "./NotificationStatus";
import NotificationPermissionAlert from "./NotificationPermissionAlert";
import NotificationTestButton from "./NotificationTestButton";
import NotificationUnsupportedCard from "./NotificationUnsupportedCard";

const NotificationManager = () => {
  const {
    isSupported,
    isSubscribed,
    permission,
    loading,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    sendTestNotification,
  } = useNotifications();

  if (!isSupported) {
    return <NotificationUnsupportedCard />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          إدارة الإشعارات
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <NotificationToggle
          isSubscribed={isSubscribed}
          loading={loading}
          onSubscribe={subscribeToNotifications}
          onUnsubscribe={unsubscribeFromNotifications}
        />

        <NotificationPermissionAlert permission={permission} />

        <NotificationTestButton
          isSubscribed={isSubscribed}
          onSendTest={sendTestNotification}
        />

        <NotificationStatus
          permission={permission}
          isSubscribed={isSubscribed}
        />
      </CardContent>
    </Card>
  );
};

export default NotificationManager;
