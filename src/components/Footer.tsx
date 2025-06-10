
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-sweet-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold sweet-gradient bg-clip-text text-transparent">
              بلا حدود للحلويات
            </h3>
            <p className="text-gray-300 leading-relaxed">
              نحن متخصصون في تقديم أجود أنواع الحلويات والمشروبات الطازجة بأفضل الأسعار وأعلى جودة.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="p-2 hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">الصفحة الرئيسية</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">كيكات</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">شوكولاته وويفرات</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">مشروبات وعصائر</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">حلوى ومليمات</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">خدمة العملاء</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">اتصل بنا</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">سياسة الإرجاع</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">الدعم الفني</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">تتبع الطلب</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-gray-300">الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-gray-300" dir="ltr">+966 50 123 4567</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-gray-300">info@sweetsunlimited.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-semibold mb-2">اشترك في النشرة الإخبارية</h5>
              <div className="flex gap-2">
                <Input 
                  placeholder="البريد الإلكتروني" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  dir="rtl"
                />
                <Button size="sm" className="sweet-gradient">
                  اشتراك
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 بلا حدود للحلويات. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
