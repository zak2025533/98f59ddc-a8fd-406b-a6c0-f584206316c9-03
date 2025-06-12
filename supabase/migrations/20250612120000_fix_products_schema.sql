
-- إضافة الأعمدة المفقودة وتعديل الأسماء
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS category_id TEXT REFERENCES categories(id),
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true;

-- نسخ البيانات من الأعمدة القديمة إلى الجديدة
UPDATE products SET is_featured = featured WHERE featured IS NOT NULL;
UPDATE products SET in_stock = (stock > 0) WHERE stock IS NOT NULL;

-- تحديث category_id بناءً على subcategory_id
UPDATE products 
SET category_id = (
  SELECT category_id 
  FROM subcategories 
  WHERE subcategories.id = products.subcategory_id
);

-- حذف الأعمدة القديمة
ALTER TABLE products DROP COLUMN IF EXISTS featured;
ALTER TABLE products DROP COLUMN IF EXISTS stock;
