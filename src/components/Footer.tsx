
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-primary/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary font-cairo">بلا حدود للحلويات</h3>
            <p className="text-muted-foreground leading-relaxed">
              نقدم لكم أجود أنواع الحلويات العربية والغربية بأعلى جودة وأفضل الأسعار
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">الرئيسية</a></li>
              <li><a href="#categories" className="text-muted-foreground hover:text-primary transition-colors">الأقسام</a></li>
              <li><a href="#featured" className="text-muted-foreground hover:text-primary transition-colors">المنتجات المميزة</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">اتصل بنا</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">معلومات التواصل</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>📞 +966 50 123 4567</li>
              <li>📧 info@sweetsunlimited.sa</li>
              <li>📍 الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">تابعونا</h4>
            <div className="flex space-x-4 space-x-reverse">
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                <span className="text-primary">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                <span className="text-primary">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
                <span className="text-primary">🐦</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 بلا حدود للحلويات. جميع الحقوق محفوظة.
          </p>
          {/* Hidden admin access - click on copyright symbol 5 times */}
          <div className="mt-2">
            <Link 
              to="/admin" 
              className="text-xs text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors"
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
