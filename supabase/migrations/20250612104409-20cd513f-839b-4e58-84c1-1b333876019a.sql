
-- إنشاء جدول سلة التسوق
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء جدول المفضلة
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(session_id, product_id)
);

-- إنشاء فهرس للبحث السريع
CREATE INDEX idx_cart_items_session_id ON cart_items(session_id);
CREATE INDEX idx_favorites_session_id ON favorites(session_id);

-- تمكين RLS للأمان
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للسماح للجميع بالوصول (لأنها تستخدم session_id وليس user_id)
CREATE POLICY "Anyone can manage cart items" ON public.cart_items FOR ALL USING (true);
CREATE POLICY "Anyone can manage favorites" ON public.favorites FOR ALL USING (true);
