
-- تفعيل Row Level Security على جدول الإعلانات
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- سياسة للسماح للجميع بقراءة الإعلانات النشطة
CREATE POLICY "Everyone can view active announcements" ON public.announcements
  FOR SELECT USING (is_active = true);

-- سياسة للسماح للجميع بقراءة جميع الإعلانات (للوحة الإدارة)
CREATE POLICY "Allow read all announcements" ON public.announcements
  FOR SELECT USING (true);

-- سياسة للسماح للجميع بإدراج إعلانات جديدة (مؤقتاً حتى نضع نظام مصادقة)
CREATE POLICY "Allow insert announcements" ON public.announcements
  FOR INSERT WITH CHECK (true);

-- سياسة للسماح للجميع بتحديث الإعلانات (مؤقتاً حتى نضع نظام مصادقة)
CREATE POLICY "Allow update announcements" ON public.announcements
  FOR UPDATE USING (true);

-- سياسة للسماح للجميع بحذف الإعلانات (مؤقتاً حتى نضع نظام مصادقة)
CREATE POLICY "Allow delete announcements" ON public.announcements
  FOR DELETE USING (true);
