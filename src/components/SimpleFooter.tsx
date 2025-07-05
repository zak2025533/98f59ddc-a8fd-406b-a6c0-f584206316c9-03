
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
    { 
      icon: Phone, 
      text: "770006120", 
      href: "tel:+967770006120"
    },
    { 
      icon: Mail, 
      text: "motahr4742@gmail.com", 
      href: "mailto:motahr4742@gmail.com"
    },
    { 
      icon: MapPin, 
      text: "اليمن - محافظة إب", 
      href: "#"
    }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: "#", 
      name: "فيسبوك"
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/mthr8180?utm_source=qr&igsh=MWx3dDJkajk0OGY3eg==", 
      name: "انستقرام"
    },
    { 
      icon: Twitter, 
      href: "#", 
      name: "تويتر"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
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
            <h4 className="text-lg font-semibold font-arabic mb-6 text-yellow-300 text-center">
              روابط سريعة
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={index}
                    to={link.href}
                    className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/30"
                  >
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl mx-auto w-fit mb-2 group-hover:scale-110 transition-transform shadow-lg">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-sm font-arabic text-blue-100 group-hover:text-white transition-colors">
                        {link.name}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold font-arabic mb-6 text-yellow-300 text-center">
              معلومات التواصل
            </h4>
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <a 
                    key={index} 
                    href={info.href}
                    className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/30 block"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-arabic text-sm text-blue-100 group-hover:text-white transition-colors flex-1">
                        {info.text}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold font-arabic mb-6 text-yellow-300 text-center">
              تابعونا على
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : '_self'}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-2xl p-4 transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/30"
                    aria-label={social.name}
                  >
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-pink-400 to-red-500 p-3 rounded-xl mx-auto w-fit mb-2 group-hover:scale-110 transition-transform shadow-lg">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs font-arabic text-blue-100 group-hover:text-white transition-colors">
                        {social.name}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 bg-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
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
