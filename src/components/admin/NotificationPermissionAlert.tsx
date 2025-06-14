
interface NotificationPermissionAlertProps {
  permission: NotificationPermission;
}

const NotificationPermissionAlert = ({ permission }: NotificationPermissionAlertProps) => {
  if (permission !== 'denied') return null;

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-sm text-red-700 font-arabic">
        تم منع الإشعارات. يرجى السماح بالإشعارات من إعدادات المتصفح.
      </p>
    </div>
  );
};

export default NotificationPermissionAlert;
