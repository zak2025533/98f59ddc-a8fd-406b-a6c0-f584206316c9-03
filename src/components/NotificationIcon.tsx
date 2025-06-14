
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'product' | 'announcement' | 'general' | 'order' | 'review' | 'warning' | 'success' | 'info' | 'promotion';
  isRead: boolean;
}

const NotificationIcon = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState<string>('all');

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
        const updated = [newNotification, ...prev].slice(0, 100); // الاحتفاظ بآخر 100 إشعار
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

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('app_notifications');
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
    const icons: { [key: string]: string } = {
      product: '📦',
      announcement: '📢',
      order: '🛒',
      review: '⭐',
      warning: '⚠️',
      success: '✅',
      info: 'ℹ️',
      promotion: '🎁',
      general: '🔔'
    };
    return icons[type] || '🔔';
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    const colors: { [key: string]: string } = {
      product: isRead ? 'hover:bg-blue-50' : 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500',
      announcement: isRead ? 'hover:bg-orange-50' : 'bg-orange-50 hover:bg-orange-100 border-l-4 border-orange-500',
      order: isRead ? 'hover:bg-green-50' : 'bg-green-50 hover:bg-green-100 border-l-4 border-green-500',
      review: isRead ? 'hover:bg-yellow-50' : 'bg-yellow-50 hover:bg-yellow-100 border-l-4 border-yellow-500',
      warning: isRead ? 'hover:bg-red-50' : 'bg-red-50 hover:bg-red-100 border-l-4 border-red-500',
      success: isRead ? 'hover:bg-emerald-50' : 'bg-emerald-50 hover:bg-emerald-100 border-l-4 border-emerald-500',
      info: isRead ? 'hover:bg-cyan-50' : 'bg-cyan-50 hover:bg-cyan-100 border-l-4 border-cyan-500',
      promotion: isRead ? 'hover:bg-purple-50' : 'bg-purple-50 hover:bg-purple-100 border-l-4 border-purple-500',
    };
    return colors[type] || (isRead ? 'hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const notificationTypes = ['all', 'unread', 'product', 'announcement', 'order', 'warning'];
  const getTypeCounts = () => {
    const counts: { [key: string]: number } = {};
    counts.all = notifications.length;
    counts.unread = notifications.filter(n => !n.isRead).length;
    
    notificationTypes.slice(2).forEach(type => {
      counts[type] = notifications.filter(n => n.type === type).length;
    });
    
    return counts;
  };

  const typeCounts = getTypeCounts();

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
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs animate-pulse"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-96 p-0" 
        align="end"
        side="bottom"
      >
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-right font-arabic">الإشعارات</h3>
            <div className="flex gap-2">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllNotifications}
                className="text-xs font-arabic text-red-600 hover:text-red-700"
              >
                مسح الكل
              </Button>
            </div>
          </div>
        </div>

        <Tabs value={filter} onValueChange={setFilter} className="w-full">
          <TabsList className="grid w-full grid-cols-3 m-2">
            <TabsTrigger value="all" className="font-arabic text-xs">
              الكل ({typeCounts.all})
            </TabsTrigger>
            <TabsTrigger value="unread" className="font-arabic text-xs">
              غير مقروء ({typeCounts.unread})
            </TabsTrigger>
            <TabsTrigger value="product" className="font-arabic text-xs">
              منتجات ({typeCounts.product || 0})
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-96">
            <TabsContent value={filter} className="mt-0">
              {filteredNotifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500 font-arabic">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-30" />
                  <p>لا توجد إشعارات</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        getNotificationColor(notification.type, notification.isRead)
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
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-400 font-arabic">
                              {formatTime(new Date(notification.timestamp))}
                            </p>
                            <Badge variant="outline" className="text-xs font-arabic">
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationIcon;
