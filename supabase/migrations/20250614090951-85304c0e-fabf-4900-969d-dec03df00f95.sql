
-- إنشاء bucket لتخزين ملفات الفيديو
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true);

-- إنشاء سياسات للوصول إلى ملفات الفيديو
CREATE POLICY "Allow public access to videos" ON storage.objects 
FOR SELECT USING (bucket_id = 'videos');

CREATE POLICY "Allow authenticated upload to videos" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'videos');

CREATE POLICY "Allow authenticated update to videos" ON storage.objects 
FOR UPDATE USING (bucket_id = 'videos');

CREATE POLICY "Allow authenticated delete to videos" ON storage.objects 
FOR DELETE USING (bucket_id = 'videos');

-- إضافة نوع جديد للإعلانات للمناسبات
ALTER TABLE public.announcements 
DROP CONSTRAINT IF EXISTS announcements_type_check;

ALTER TABLE public.announcements 
ADD CONSTRAINT announcements_type_check 
CHECK (type IN ('discount', 'general', 'promotion', 'news', 'event'));
