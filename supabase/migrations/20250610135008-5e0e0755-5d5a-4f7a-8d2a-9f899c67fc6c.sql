
-- إنشاء جدول للأقسام الرئيسية
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- إنشاء جدول للفئات الفرعية
CREATE TABLE IF NOT EXISTS public.subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- إنشاء جدول للمنتجات
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  subcategory_id UUID NOT NULL REFERENCES public.subcategories(id) ON DELETE CASCADE,
  image_url TEXT,
  stock INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- إنشاء جدول للمشرفين
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- إدخال بيانات الأقسام الرئيسية
INSERT INTO public.categories (name, slug, image_url)
VALUES 
  ('كيكات', 'cakes', '/images/categories/cakes.jpg'),
  ('ويفرات وشوكولاته', 'wafers-and-chocolate', '/images/categories/chocolate.jpg'),
  ('مشروبات وعصائر', 'drinks-and-juices', '/images/categories/drinks.jpg'),
  ('حلوى ومليمات', 'candies', '/images/categories/candies.jpg')
ON CONFLICT (slug) DO NOTHING;

-- إدخال بيانات المشرف
INSERT INTO public.admins (username, password)
VALUES ('zakzakzak', 'zak1212zak')
ON CONFLICT (username) DO NOTHING;

-- تمكين Row Level Security للحماية
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- سياسات الوصول للمنتجات والفئات (قراءة عامة)
CREATE POLICY "Public read access for categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public read access for subcategories" ON public.subcategories FOR SELECT USING (true);
CREATE POLICY "Public read access for products" ON public.products FOR SELECT USING (true);

-- سياسة حماية خاصة لجدول المشرفين
CREATE POLICY "No access to admins table" ON public.admins USING (false);
