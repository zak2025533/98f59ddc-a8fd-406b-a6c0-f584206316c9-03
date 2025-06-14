
-- حذف جدول سجل الإشعارات
DROP TABLE IF EXISTS public.notifications_log CASCADE;

-- حذف جدول اشتراكات الإشعارات الفورية
DROP TABLE IF EXISTS public.push_subscriptions CASCADE;

-- حذف الدالة المخصصة للإشعارات إن وجدت
DROP FUNCTION IF EXISTS public.send_notification CASCADE;
