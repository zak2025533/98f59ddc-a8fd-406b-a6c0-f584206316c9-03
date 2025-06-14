
-- إنشاء جدول لتتبع الزوار والتفاعلات
CREATE TABLE public.visitor_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_type TEXT NOT NULL CHECK (visitor_type IN ('visit', 'download', 'install', 'pwa_install')),
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT,
  page_url TEXT,
  device_info JSONB,
  location_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء فهرس لتحسين الأداء
CREATE INDEX idx_visitor_analytics_type ON public.visitor_analytics(visitor_type);
CREATE INDEX idx_visitor_analytics_created_at ON public.visitor_analytics(created_at);
CREATE INDEX idx_visitor_analytics_session_id ON public.visitor_analytics(session_id);

-- إنشاء جدول لإحصائيات الزوار اليومية (للأداء)
CREATE TABLE public.daily_visitor_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  total_visits INTEGER DEFAULT 0,
  total_downloads INTEGER DEFAULT 0,
  total_installs INTEGER DEFAULT 0,
  total_pwa_installs INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date)
);

-- تفعيل RLS للأمان
ALTER TABLE public.visitor_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_visitor_stats ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات للسماح بالقراءة والكتابة للجميع (للتتبع العام)
CREATE POLICY "Allow public insert for visitor analytics" 
  ON public.visitor_analytics 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public select for visitor analytics" 
  ON public.visitor_analytics 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public access for daily stats" 
  ON public.daily_visitor_stats 
  FOR ALL 
  USING (true);

-- دالة لتحديث الإحصائيات اليومية
CREATE OR REPLACE FUNCTION update_daily_visitor_stats()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.daily_visitor_stats (date, total_visits, total_downloads, total_installs, total_pwa_installs, unique_visitors)
  VALUES (
    CURRENT_DATE,
    CASE WHEN NEW.visitor_type = 'visit' THEN 1 ELSE 0 END,
    CASE WHEN NEW.visitor_type = 'download' THEN 1 ELSE 0 END,
    CASE WHEN NEW.visitor_type = 'install' THEN 1 ELSE 0 END,
    CASE WHEN NEW.visitor_type = 'pwa_install' THEN 1 ELSE 0 END,
    1
  )
  ON CONFLICT (date) DO UPDATE SET
    total_visits = daily_visitor_stats.total_visits + CASE WHEN NEW.visitor_type = 'visit' THEN 1 ELSE 0 END,
    total_downloads = daily_visitor_stats.total_downloads + CASE WHEN NEW.visitor_type = 'download' THEN 1 ELSE 0 END,
    total_installs = daily_visitor_stats.total_installs + CASE WHEN NEW.visitor_type = 'install' THEN 1 ELSE 0 END,
    total_pwa_installs = daily_visitor_stats.total_pwa_installs + CASE WHEN NEW.visitor_type = 'pwa_install' THEN 1 ELSE 0 END,
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إنشاء مُشغل لتحديث الإحصائيات تلقائياً
CREATE TRIGGER update_daily_stats_trigger
  AFTER INSERT ON public.visitor_analytics
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_visitor_stats();
