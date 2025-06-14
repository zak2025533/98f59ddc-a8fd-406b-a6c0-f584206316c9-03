
-- إضافة حقول جديدة لجدول الإعلانات لدعم الفيديو والبانر
ALTER TABLE public.announcements 
ADD COLUMN video_url TEXT,
ADD COLUMN banner_text TEXT,
ADD COLUMN is_banner BOOLEAN DEFAULT false;

-- إضافة فهرس لتحسين الأداء
CREATE INDEX idx_announcements_banner ON public.announcements(is_banner);
