
interface NotificationStatusProps {
  permission: NotificationPermission;
  isSubscribed: boolean;
}

const NotificationStatus = ({ permission, isSubscribed }: NotificationStatusProps) => {
  return (
    <div className="text-sm text-muted-foreground font-arabic">
      <p><strong>حالة الإذن:</strong> {permission === 'granted' ? 'مُفعّل' : permission === 'denied' ? 'مرفوض' : 'في الانتظار'}</p>
      <p><strong>حالة الاشتراك:</strong> {isSubscribed ? 'مشترك' : 'غير مشترك'}</p>
    </div>
  );
};

export default NotificationStatus;
