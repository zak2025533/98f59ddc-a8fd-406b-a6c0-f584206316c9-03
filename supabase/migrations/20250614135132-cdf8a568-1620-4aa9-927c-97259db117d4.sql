
-- حذف جميع السياسات الموجودة على جداول الإشعارات
DROP POLICY IF EXISTS "Everyone can view active announcements" ON public.announcements;
DROP POLICY IF EXISTS "Allow read all announcements" ON public.announcements;
DROP POLICY IF EXISTS "Allow insert announcements" ON public.announcements;
DROP POLICY IF EXISTS "Allow update announcements" ON public.announcements;
DROP POLICY IF EXISTS "Allow delete announcements" ON public.announcements;

-- إيقاف RLS مؤقتاً لحذف السياسات
ALTER TABLE public.push_subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications_log DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements DISABLE ROW LEVEL SECURITY;

-- حذف أي سياسات متبقية
DROP POLICY IF EXISTS "Allow all operations on push_subscriptions" ON public.push_subscriptions;
DROP POLICY IF EXISTS "Allow all operations on notifications_log" ON public.notifications_log;

-- إعادة تفعيل RLS وإنشاء سياسات جديدة مبسطة
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications_log ENABLE ROW LEVEL SECURITY;

-- سياسات مبسطة للسماح بجميع العمليات (للتطوير)
CREATE POLICY "Allow all operations on announcements" ON public.announcements
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on push_subscriptions" ON public.push_subscriptions
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on notifications_log" ON public.notifications_log
  FOR ALL USING (true) WITH CHECK (true);

-- التأكد من أن الجداول تدعم التحديثات الفورية
ALTER TABLE public.announcements REPLICA IDENTITY FULL;
ALTER TABLE public.push_subscriptions REPLICA IDENTITY FULL;
ALTER TABLE public.notifications_log REPLICA IDENTITY FULL;

-- إضافة الجداول إلى منشور التحديثات الفورية
ALTER PUBLICATION supabase_realtime ADD TABLE public.announcements;
ALTER PUBLICATION supabase_realtime ADD TABLE public.push_subscriptions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications_log;
