import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Phone, 
  Mail, 
  MapPin, 
  Home,
  Grid3X3,
  Info,
  MessageCircle
} from "lucide-react";

const SimpleFooter = () => {
  const quickLinks = [
    { name: "الرئيسية", href: "/", icon: Home },
    { name: "الأقسام", href: "/category", icon: Grid3X3 },
    { name: "من نحن", href: "/about", icon: Info },
    { name: "اتصل بنا", href: "/contact", icon: MessageCircle }
  ];

  const contactInfo = [
    { icon: Phone, text: "770006120", href: "tel:+967770006120" },
    { icon: Mail, text: "motahr4742@gmail.com", href: "mailto:motahr4742@gmail.com" },
    { icon: MapPin, text: "اليمن - محافظة إب", href: "#" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "فيسبوك" },
    { icon: Instagram, href: "https://www.instagram.com/mthr8180?utm_source=qr&igsh=MWx3dDJkajk0OGY3eg==", name: "انستقرام" },
    { icon: Twitter, href: "#", name: "تويتر" }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      {/* Main Footer */}
      <div className="w-full px-4 py-12">
        {/* Company Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img
              src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png"
              alt="بلا حدود للحلويات"
              className="h-16 w-16 rounded-full shadow-xl border-4 border-white/20"
            />
            <div>
              <h3 className="text-2xl font-bold font-arabic text-yellow-300">
                بلا حدود للحلويات
              </h3>
              <p className="text-blue-200 text-sm">Unlimited Sweets</p>
            </div>
          </div>
          <p className="text-blue-100 font-arabic max-w-2xl mx-auto">
            متجر متخصص ببيع أفضل الحلويات والمشروبات الطازجة بجودة عالية وطعم استثنائي
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-arabic mb-4 text-yellow-300">
              روابط سريعة
            </h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={index}
                    to={link.href}
                    className="flex items-center space-x-3 space-x-reverse text-blue-100 hover:text-white transition-colors group"
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-arabic">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold font-arabic mb-4 text-yellow-300">
              معلومات التواصل
            </h4>
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a 
                    key={index} 
                    href={info.href}
                    className="flex items-center space-x-3 space-x-reverse text-blue-100 hover:text-white transition-colors group"
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-arabic text-sm">{info.text}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold font-arabic mb-4 text-yellow-300">
              تابعونا على
            </h4>
            <div className="flex space-x-4 space-x-reverse">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : '_self'}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110 group"
                    aria-label={social.name}
                  >
                    <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 bg-blue-900/20">
        <div className="w-full px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-200 text-sm font-arabic">
              بلا حدود للحلويات - جميع الحقوق محفوظة
            </div>
            <div className="text-blue-200 text-sm font-arabic text-center">
              <div className="mb-2">
                تصميم وتطوير المهندس: زكريا نبيل الحاج
              </div>
              <div className="flex items-center justify-center gap-2">
                <a 
                  href="https://wa.me/967780652001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 group"
                >
                  <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs">780652001</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
