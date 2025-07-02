
-- إنشاء سياسة للسماح بالقراءة العامة للتقييمات المعتمدة
CREATE POLICY "Enable read access for approved reviews" ON "public"."product_reviews"
AS PERMISSIVE FOR SELECT
TO public
USING (is_approved = true);

-- إنشاء سياسة للسماح بإضافة التقييمات للجميع
CREATE POLICY "Enable insert access for all users" ON "public"."product_reviews"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- تحديث سياسة القراءة لجدول product_ratings_summary
ALTER TABLE "public"."product_ratings_summary" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for ratings summary" ON "public"."product_ratings_summary"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- التأكد من أن الجدول يمكن الوصول إليه
GRANT SELECT ON "public"."product_ratings_summary" TO anon;
GRANT SELECT ON "public"."product_reviews" TO anon;
GRANT INSERT ON "public"."product_reviews" TO anon;
