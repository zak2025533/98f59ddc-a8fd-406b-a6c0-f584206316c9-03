
-- حذف الجداول الموجودة
DROP TABLE IF EXISTS public.notifications_log CASCADE;
DROP TABLE IF EXISTS public.push_subscriptions CASCADE;

-- إنشاء جدول لحفظ اشتراكات الإشعارات بدون مستخدمين
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  keys JSONB NOT NULL, -- سيحتوي على p256dh و auth
  user_agent TEXT,
  ip_address TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_push_subscriptions_active ON public.push_subscriptions(is_active);
CREATE INDEX idx_push_subscriptions_endpoint ON public.push_subscriptions(endpoint);
CREATE INDEX idx_push_subscriptions_created_at ON public.push_subscriptions(created_at);

-- إضافة trigger لتحديث updated_at
CREATE TRIGGER update_push_subscriptions_updated_at 
    BEFORE UPDATE ON public.push_subscriptions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- إنشاء جدول لسجل الإشعارات المرسلة
CREATE TABLE public.notifications_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'general' CHECK (type IN ('product', 'announcement', 'general')),
  related_id UUID, -- معرف المنتج أو الإعلان
  sent_to_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- فهرس لجدول سجل الإشعارات
CREATE INDEX idx_notifications_log_type ON public.notifications_log(type);
CREATE INDEX idx_notifications_log_created_at ON public.notifications_log(created_at);
CREATE INDEX idx_notifications_log_related_id ON public.notifications_log(related_id);

-- تفعيل RLS للأمان
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications_log ENABLE ROW LEVEL SECURITY;

-- سياسات للسماح بالقراءة والكتابة للجميع (للاشتراكات العامة)
CREATE POLICY "Allow public insert for push subscriptions" 
  ON public.push_subscriptions 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public select for push subscriptions" 
  ON public.push_subscriptions 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public update for push subscriptions" 
  ON public.push_subscriptions 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete for push subscriptions" 
  ON public.push_subscriptions 
  FOR DELETE 
  USING (true);

-- سياسات لسجل الإشعارات (قراءة للجميع، كتابة للخادم فقط)
CREATE POLICY "Allow public select for notifications log" 
  ON public.notifications_log 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert for notifications log" 
  ON public.notifications_log 
  FOR INSERT 
  WITH CHECK (true);
