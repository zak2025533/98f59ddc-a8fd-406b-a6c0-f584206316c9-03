-- تحديث السياسات للسماح بالوصول للتقييمات
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."product_reviews";
DROP POLICY IF EXISTS "Enable read access for approved reviews" ON "public"."product_reviews";
DROP POLICY IF EXISTS "Enable insert access for all users" ON "public"."product_reviews";

-- إنشاء سياسات جديدة للتقييمات
CREATE POLICY "Public can read approved reviews" ON "public"."product_reviews"
FOR SELECT TO anon, authenticated
USING (is_approved = true);

CREATE POLICY "Public can insert reviews" ON "public"."product_reviews"
FOR INSERT TO anon, authenticated
WITH CHECK (true);

-- تحديث سياسات product_ratings_summary
DROP POLICY IF EXISTS "Enable read access for ratings summary" ON "public"."product_ratings_summary";

CREATE POLICY "Public can read ratings summary" ON "public"."product_ratings_summary"
FOR SELECT TO anon, authenticated
USING (true);

-- منح الصلاحيات الصحيحة
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT ON "public"."product_reviews" TO anon;
GRANT SELECT ON "public"."product_ratings_summary" TO anon;