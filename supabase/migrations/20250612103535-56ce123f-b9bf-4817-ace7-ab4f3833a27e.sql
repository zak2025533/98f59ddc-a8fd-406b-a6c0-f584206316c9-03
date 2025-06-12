
-- Add the missing columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id),
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS in_stock BOOLEAN DEFAULT true;

-- Copy data from old columns to new ones
UPDATE products SET is_featured = featured WHERE featured IS NOT NULL;
UPDATE products SET in_stock = (stock > 0) WHERE stock IS NOT NULL;

-- Update category_id based on subcategory_id
UPDATE products 
SET category_id = (
  SELECT category_id 
  FROM subcategories 
  WHERE subcategories.id = products.subcategory_id
);

-- Drop the old columns
ALTER TABLE products DROP COLUMN IF EXISTS featured;
ALTER TABLE products DROP COLUMN IF EXISTS stock;
