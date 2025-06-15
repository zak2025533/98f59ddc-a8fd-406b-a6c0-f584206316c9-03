
-- إنشاء جدول التقييمات
CREATE TABLE public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- إنشاء فهرس لتحسين الأداء
CREATE INDEX idx_product_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX idx_product_reviews_rating ON public.product_reviews(rating);
CREATE INDEX idx_product_reviews_approved ON public.product_reviews(is_approved);

-- إضافة trigger لتحديث updated_at
CREATE TRIGGER update_product_reviews_updated_at
  BEFORE UPDATE ON public.product_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- إنشاء view لحساب متوسط التقييمات لكل منتج
CREATE OR REPLACE VIEW public.product_ratings_summary AS
SELECT 
  product_id,
  COUNT(*) as total_reviews,
  ROUND(AVG(rating)::numeric, 1) as average_rating,
  COUNT(CASE WHEN rating = 5 THEN 1 END) as five_stars,
  COUNT(CASE WHEN rating = 4 THEN 1 END) as four_stars,
  COUNT(CASE WHEN rating = 3 THEN 1 END) as three_stars,
  COUNT(CASE WHEN rating = 2 THEN 1 END) as two_stars,
  COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
FROM public.product_reviews 
WHERE is_approved = true
GROUP BY product_id;

-- تمكين Row Level Security
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة: الجميع يمكنهم قراءة التقييمات المعتمدة
CREATE POLICY "Anyone can view approved reviews" 
  ON public.product_reviews 
  FOR SELECT 
  USING (is_approved = true);

-- سياسة للإضافة: أي شخص يمكنه إضافة تقييم
CREATE POLICY "Anyone can create reviews" 
  ON public.product_reviews 
  FOR INSERT 
  WITH CHECK (true);

-- سياسة للتحديث: المستخدم يمكنه تعديل تقييمه الخاص فقط
CREATE POLICY "Users can update their own reviews" 
  ON public.product_reviews 
  FOR UPDATE 
  USING (session_id = current_setting('request.jwt.claims', true)::json->>'session_id' 
         OR session_id = current_setting('app.session_id', true));
