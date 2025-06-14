
import { Phone, Mail, MapPin } from "lucide-react";

const SimpleFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* معلومات التواصل */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold font-arabic mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="h-5 w-5 ml-2" />
                <span className="font-arabic">+966 123 456 789</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="h-5 w-5 ml-2" />
                <span className="font-arabic">info@sweets.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <MapPin className="h-5 w-5 ml-2" />
                <span className="font-arabic">الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* الشعار */}
          <div className="text-center">
            <h2 className="text-2xl font-bold font-arabic mb-4">بلا حدود للحلويات</h2>
            <p className="font-arabic text-gray-300">
              أفضل الحلويات الطازجة بجودة عالية
            </p>
          </div>

          {/* الروابط */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold font-arabic mb-4">روابط سريعة</h3>
            <div className="space-y-2">
              <a href="/" className="block font-arabic hover:text-yellow-300 transition-colors">الرئيسية</a>
              <a href="/category" className="block font-arabic hover:text-yellow-300 transition-colors">الفئات</a>
              <a href="/about" className="block font-arabic hover:text-yellow-300 transition-colors">من نحن</a>
              <a href="/contact" className="block font-arabic hover:text-yellow-300 transition-colors">اتصل بنا</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="font-arabic text-gray-300">
            © 2024 بلا حدود للحلويات. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
