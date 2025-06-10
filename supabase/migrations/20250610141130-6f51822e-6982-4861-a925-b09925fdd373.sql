
-- إنشاء bucket لتخزين الصور
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true);

-- إنشاء سياسات للوصول إلى الصور
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Admin can upload images" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Admin can update images" ON storage.objects FOR UPDATE 
USING (bucket_id = 'product-images');

CREATE POLICY "Admin can delete images" ON storage.objects FOR DELETE 
USING (bucket_id = 'product-images');
