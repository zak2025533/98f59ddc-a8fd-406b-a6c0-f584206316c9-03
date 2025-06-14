
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'product' | 'announcement' | 'general';
  isRead: boolean;
}

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // تحميل الإشعارات من localStorage عند بدء التطبيق
    const savedNotifications = localStorage.getItem('app_notifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed);
      setUnreadCount(parsed.filter((n: Notification) => !n.isRead).length);
    }

    // الاستماع للإشعارات الجديدة
    const handleNewNotification = (event: CustomEvent) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        title: event.detail.title,
        description: event.detail.description,
        timestamp: new Date(),
        type: event.detail.type || 'general',
        isRead: false,
      };

      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, 50); // الاحتفاظ بآخر 50 إشعار
        localStorage.setItem('app_notifications', JSON.stringify(updated));
        return updated;
      });

      setUnreadCount(prev => prev + 1);
    };

    window.addEventListener('newNotification', handleNewNotification as EventListener);

    return () => {
      window.removeEventListener('newNotification', handleNewNotification as EventListener);
    };
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => 
        n.id === id ? { ...n, isRead: true } : n
      );
      localStorage.setItem('app_notifications', JSON.stringify(updated));
      return updated;
    });
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isRead: true }));
      localStorage.setItem('app_notifications', JSON.stringify(updated));
      return updated;
    });
    setUnreadCount(0);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "الآن";
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'product':
        return '🆕';
      case 'announcement':
        return '📢';
      default:
        return '🔔';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative h-10 w-10 p-0 hover:bg-blue-50"
        >
          <Bell className="h-5 w-5 text-blue-700" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-0" 
        align="end"
        side="bottom"
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-right font-arabic">الإشعارات</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs font-arabic"
              >
                تحديد الكل كمقروء
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-gray-500 font-arabic">
              <Bell className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>لا توجد إشعارات</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    !notification.isRead 
                      ? 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1 text-right">
                      <h4 className={`text-sm font-arabic ${
                        !notification.isRead ? 'font-semibold' : 'font-medium'
                      }`}>
                        {notification.title}
                      </h4>
                      <p className="text-xs text-gray-600 font-arabic mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 font-arabic mt-2">
                        {formatTime(new Date(notification.timestamp))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationIcon;
