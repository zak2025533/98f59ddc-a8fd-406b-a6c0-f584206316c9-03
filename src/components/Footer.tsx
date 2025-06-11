
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-sweet-brown to-gray-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🍰</div>
        <div className="absolute top-20 right-20 text-4xl">🧁</div>
        <div className="absolute bottom-20 left-1/4 text-5xl">🍫</div>
        <div className="absolute bottom-10 right-10 text-4xl">🍭</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-1">
            <h3 className="text-3xl font-bold sweet-gradient bg-clip-text text-transparent font-arabic">
              بلا حدود للحلويات
            </h3>
            <p className="text-gray-300 leading-relaxed font-arabic">
              نحن متخصصون في تقديم أجود أنواع الحلويات والمشروبات الطازجة بأفضل الأسعار وأعلى جودة. رضاكم هو هدفنا الأول.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <Button size="sm" variant="ghost" className="p-3 hover:bg-white/10 rounded-full group">
                <Facebook className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
              </Button>
              <Button size="sm" variant="ghost" className="p-3 hover:bg-white/10 rounded-full group">
                <Instagram className="h-5 w-5 group-hover:text-pink-400 transition-colors" />
              </Button>
              <Button size="sm" variant="ghost" className="p-3 hover:bg-white/10 rounded-full group">
                <Twitter className="h-5 w-5 group-hover:text-blue-400 transition-colors" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-sweet-gold font-arabic">روابط سريعة</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors flex items-center font-arabic">
                الصفحة الرئيسية
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors flex items-center font-arabic">
                كيكات
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors flex items-center font-arabic">
                شوكولاته وويفرات
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors flex items-center font-arabic">
                مشروبات وعصائر
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors flex items-center font-arabic">
                حلوى ومليمات
              </a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-sweet-gold font-arabic">خدمة العملاء</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors font-arabic">اتصل بنا</a></li>
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors font-arabic">الأسئلة الشائعة</a></li>
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors font-arabic">سياسة الإرجاع</a></li>
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors font-arabic">الدعم الفني</a></li>
              <li><a href="#" className="text-gray-300 hover:text-sweet-gold transition-colors font-arabic">تتبع الطلب</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-sweet-gold font-arabic">تواصل معنا</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-sweet-gold/20 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-sweet-gold" />
                </div>
                <span className="text-gray-300 font-arabic">إب، اليمن</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-sweet-gold/20 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-sweet-gold" />
                </div>
                <span className="text-gray-300" dir="ltr">+967 770006120</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="bg-sweet-gold/20 p-2 rounded-full">
                  <Mail className="h-5 w-5 text-sweet-gold" />
                </div>
                <span className="text-gray-300">motahr4742@gmail.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <h5 className="font-semibold mb-4 text-sweet-gold font-arabic">اشترك في النشرة الإخبارية</h5>
              <div className="flex gap-2">
                <Input 
                  placeholder="البريد الإلكتروني" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-1 font-arabic"
                  dir="rtl"
                />
                <Button className="sweet-gradient hover:opacity-90 transition-opacity px-6 font-arabic">
                  اشتراك
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-16 pt-8 text-center">
          <p className="text-gray-300 flex items-center justify-center gap-2 font-arabic">
            © 2024 بلا حدود للحلويات. جميع الحقوق محفوظة.
            <Heart className="h-4 w-4 text-red-400" />
            صُنع بحب في اليمن
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
