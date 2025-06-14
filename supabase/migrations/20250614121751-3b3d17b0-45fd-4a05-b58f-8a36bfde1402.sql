
-- إنشاء جدول لتخزين اشتراكات الإشعارات
CREATE TABLE public.push_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL,
  keys JSONB NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- إنشاء جدول لتخزين سجل الإشعارات المرسلة
CREATE TABLE public.notifications_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('product', 'announcement', 'general')),
  related_id UUID,
  sent_to_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إضافة فهارس لتحسين الأداء
CREATE INDEX idx_push_subscriptions_active ON public.push_subscriptions(is_active);
CREATE INDEX idx_notifications_log_type ON public.notifications_log(type);
CREATE INDEX idx_notifications_log_created_at ON public.notifications_log(created_at);

-- إضافة trigger لتحديث updated_at
CREATE TRIGGER update_push_subscriptions_updated_at 
    BEFORE UPDATE ON public.push_subscriptions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
