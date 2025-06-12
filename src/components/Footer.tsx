
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-yellow-50 border-t border-blue-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png" 
                alt="بلا حدود للحلويات" 
                className="h-12 w-12"
              />
              <div>
                <h3 className="text-xl font-bold text-blue-800 font-arabic">بلا حدود للحلويات</h3>
                <p className="text-sm text-yellow-600">Unlimited Sweets</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed font-arabic">
              نقدم لكم أجود أنواع الحلويات العربية والغربية بأعلى جودة وأفضل الأسعار
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-800 font-arabic">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors font-arabic">الرئيسية</a></li>
              <li><a href="#categories" className="text-muted-foreground hover:text-blue-600 transition-colors font-arabic">الأقسام</a></li>
              <li><a href="#featured" className="text-muted-foreground hover:text-blue-600 transition-colors font-arabic">المنتجات المميزة</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors font-arabic">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-800 font-arabic">معلومات التواصل</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>📞 +966 50 123 4567</li>
              <li>📧 info@unlimitedsweets.sa</li>
              <li>📍 الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-blue-800 font-arabic">تابعونا</h4>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                <span className="text-blue-600">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                <span className="text-blue-600">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                <span className="text-blue-600">🐦</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-200 mt-8 pt-8 text-center">
          <p className="text-muted-foreground font-arabic">
            © 2024 بلا حدود للحلويات. جميع الحقوق محفوظة.
          </p>
          {/* Hidden admin access */}
          <div className="mt-2">
            <Link 
              to="/admin" 
              className="text-xs text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors font-arabic"
              style={{ fontSize: '10px' }}
            >
              إدارة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
