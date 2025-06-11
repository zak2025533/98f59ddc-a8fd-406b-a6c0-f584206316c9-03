
-- إضافة سياسات الوصول للفئات الفرعية والمنتجات للسماح بالكتابة للمشرفين
CREATE POLICY "Allow admin insert for subcategories" ON public.subcategories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update for subcategories" ON public.subcategories FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete for subcategories" ON public.subcategories FOR DELETE USING (true);

CREATE POLICY "Allow admin insert for products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update for products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete for products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Allow admin insert for categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update for categories" ON public.categories FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete for categories" ON public.categories FOR DELETE USING (true);
