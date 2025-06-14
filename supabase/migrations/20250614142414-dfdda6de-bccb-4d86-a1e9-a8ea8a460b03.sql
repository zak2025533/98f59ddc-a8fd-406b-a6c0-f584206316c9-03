
-- حذف الأقسام المحددة وجميع البيانات المرتبطة بها
-- سيتم حذف الأقسام الفرعية والمنتجات تلقائياً بسبب CASCADE

DELETE FROM public.categories 
WHERE name IN (
  'الكيك والتورت',
  'الحلويات الشرقية', 
  'المشروبات',
  'الآيس كريم'
);

-- تحديث الأقسام المتبقية إذا كانت موجودة
-- استبدال الأقسام المحذوفة بأقسام جديدة إذا لزم الأمر

INSERT INTO public.categories (name, slug, image_url)
VALUES 
  ('كيكات', 'cakes', '/images/categories/cakes.jpg'),
  ('ويفرات وشوكولاته', 'wafers-and-chocolate', '/images/categories/chocolate.jpg'),
  ('مشروبات وعصائر', 'drinks-and-juices', '/images/categories/drinks.jpg'),
  ('حلوى ومليمات', 'candies', '/images/categories/candies.jpg')
ON CONFLICT (slug) DO NOTHING;
