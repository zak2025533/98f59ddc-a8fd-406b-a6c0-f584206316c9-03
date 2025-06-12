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
            <ul className="space-y-2 text-muted-foreground font-arabic">
              <li>📞 <a href="tel:770006120" className="hover:text-blue-600 transition-colors">770006120</a></li>
              <li>📧 <a href="mailto:motahr4742@gmail.com" className="hover:text-blue-600 transition-colors">motahr4742@gmail.com</a></li>
              <li>📍 <a href="https://www.google.com/maps?q=13.9731,44.1712" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">محافظة إب - الجمهورية اليمنية</a></li>
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
              <a 
                href="https://wa.me/967780652001" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  className="text-green-600"
                >
                  <path d="M20.52 3.48A11.877 11.877 0 0012.01 0C5.37 0 .02 5.36.02 11.98c0 2.11.55 4.17 1.6 5.99L0 24l6.21-1.6a11.99 11.99 0 005.8 1.48h.01c6.63 0 12.01-5.37 12.01-11.99a11.9 11.9 0 00-3.51-8.41zM12.02 22.1h-.01a10.06 10.06 0 01-5.12-1.4l-.37-.22-3.69.95.99-3.6-.24-.37a10.08 10.08 0 01-1.54-5.37C2.04 6.44 6.46 2.03 12.01 2.03c2.69 0 5.21 1.05 7.11 2.94a9.9 9.9 0 012.94 7.01c0 5.55-4.52 10.06-10.04 10.12zM17.47 14.6c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.19.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.51-1.78-1.69-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.34.45-.5.15-.17.2-.28.3-.47.1-.2.05-.37-.03-.52-.07-.15-.65-1.57-.89-2.16-.23-.56-.47-.48-.66-.48l-.56-.01c-.2 0-.52.07-.8.37s-1.05 1.02-1.05 2.5c0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.26 5.14 4.57.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.34z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-200 mt-8 pt-8 text-center">
          <p className="text-muted-foreground font-arabic">
            بلا حدود للحلويات - تصميم وتطوير المهندس: زكريا نبيل محمد الحاج |{" "}
            <a
              href="https://wa.me/967780652001"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline inline-flex items-center gap-1"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                className="text-green-600"
              >
                <path d="M20.52 3.48A11.877 11.877 0 0012.01 0C5.37 0 .02 5.36.02 11.98c0 2.11.55 4.17 1.6 5.99L0 24l6.21-1.6a11.99 11.99 0 005.8 1.48h.01c6.63 0 12.01-5.37 12.01-11.99a11.9 11.9 0 00-3.51-8.41zM12.02 22.1h-.01a10.06 10.06 0 01-5.12-1.4l-.37-.22-3.69.95.99-3.6-.24-.37a10.08 10.08 0 01-1.54-5.37C2.04 6.44 6.46 2.03 12.01 2.03c2.69 0 5.21 1.05 7.11 2.94a9.9 9.9 0 012.94 7.01c0 5.55-4.52 10.06-10.04 10.12zM17.47 14.6c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.19.3-.76.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.51-1.78-1.69-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.34.45-.5.15-.17.2-.28.3-.47.1-.2.05-.37-.03-.52-.07-.15-.65-1.57-.89-2.16-.23-.56-.47-.48-.66-.48l-.56-.01c-.2 0-.52.07-.8.37s-1.05 1.02-1.05 2.5c0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.26 5.14 4.57.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.34z"/>
              </svg>
              ‎780652001
            </a>
          </p>
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
