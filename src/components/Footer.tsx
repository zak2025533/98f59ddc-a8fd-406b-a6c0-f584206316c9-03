import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Heart
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "الأقسام", href: "/#categories" },
    { name: "من نحن", href: "/about" },
    { name: "اتصل بنا", href: "/contact" }
  ];

  const categories = [
    { name: "كيكات", href: "/category/cakes" },
    { name: "ويفرات وشوكولاته", href: "/category/wafers-and-chocolate" },
    { name: "مشروبات وعصائر", href: "/category/drinks-and-juices" },
    { name: "حلوى ومليمات", href: "/category/candies" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "فيسبوك" },
    { icon: Instagram, href: "#", name: "انستقرام" },
    { icon: Twitter, href: "#", name: "تويتر" }
  ];

  const contactInfo = [
    { icon: Phone, text: "+966 11 234 5678" },
    { icon: Mail, text: "info@unlimited-sweets.com" },
    { icon: MapPin, text: "الرياض - حي النرجس" },
    { icon: Clock, text: "السبت - الخميس: 8 ص - 12 م" }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png"
                alt="بلا حدود للحلويات"
                className="h-12 w-12 rounded-full shadow-lg"
              />
              <div>
                <h3 className="text-xl font-bold font-arabic">بلا حدود للحلويات</h3>
                <p className="text-blue-200 text-sm">Unlimited Sweets</p>
              </div>
            </div>
            
            <p className="text-blue-100 font-arabic leading-relaxed">
              متجر متخصص في صناعة أفضل الحلويات والمشروبات الطازجة بجودة عالية وطعم استثنائي
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-arabic border-b border-blue-300 pb-2">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-blue-100 hover:text-white transition-colors font-arabic flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-300 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-arabic border-b border-blue-300 pb-2">
              أقسام المنتجات
            </h4>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link
                    to={category.href}
                    className="text-blue-100 hover:text-white transition-colors font-arabic flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-300 rounded-full mr-3 group-hover:w-2 transition-all"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold font-arabic border-b border-blue-300 pb-2">
              معلومات التواصل
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <li key={index} className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-blue-300 flex-shrink-0" />
                    <span className="text-blue-100 font-arabic text-sm">{info.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-200 text-sm font-arabic text-center md:text-right">
              © 2024 بلا حدود للحلويات. جميع الحقوق محفوظة.
            </div>
            
            <div className="flex items-center space-x-1 text-blue-200 text-sm">
              <span className="font-arabic">صُنع بـ</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span className="font-arabic">في المملكة العربية السعودية</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
