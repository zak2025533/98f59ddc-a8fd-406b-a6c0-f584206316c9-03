
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Heart,
  Home,
  Grid3X3,
  Info,
  MessageCircle,
  MessageSquare
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "الرئيسية", href: "/", icon: Home },
    { name: "الأقسام", href: "/#categories", icon: Grid3X3 },
    { name: "من نحن", href: "/about", icon: Info },
    { name: "اتصل بنا", href: "/contact", icon: MessageCircle }
  ];

  const categories = [
    { name: "كيكات", href: "/category/cakes" },
    { name: "ويفرات وشوكولاته", href: "/category/wafers-and-chocolate" },
    { name: "مشروبات وعصائر", href: "/category/drinks-and-juices" },
    { name: "حلوى ومليمات", href: "/category/candies" }
  ];

  const socialLinks = [
    { 
      icon: Facebook, 
      href: "#", 
      name: "فيسبوك", 
      color: "hover:bg-blue-600 hover:shadow-blue-500/25" 
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/mthr8180?utm_source=qr&igsh=MWx3dDJkajk0OGY3eg==", 
      name: "انستقرام", 
      color: "hover:bg-pink-600 hover:shadow-pink-500/25" 
    },
    { 
      icon: Twitter, 
      href: "#", 
      name: "تويتر", 
      color: "hover:bg-sky-500 hover:shadow-sky-500/25" 
    }
  ];

  const contactInfo = [
    { 
      icon: Phone, 
      text: "770006120", 
      color: "text-green-400",
      href: "tel:+967770006120",
      bgColor: "hover:bg-green-500/10"
    },
    { 
      icon: Mail, 
      text: "motahr4742@gmail.com", 
      color: "text-red-400",
      href: "mailto:motahr4742@gmail.com",
      bgColor: "hover:bg-red-500/10"
    },
    { 
      icon: MapPin, 
      text: "اليمن - محافظة إب", 
      color: "text-yellow-400",
      href: "https://maps.google.com/?q=اليمن محافظة إب",
      bgColor: "hover:bg-yellow-500/10"
    },
    { 
      icon: Clock, 
      text: "السبت - الخميس: 8 ص - 12 م", 
      color: "text-purple-400",
      href: "#",
      bgColor: "hover:bg-purple-500/10"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Company Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img
              src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png"
              alt="بلا حدود للحلويات"
              className="h-16 w-16 rounded-full shadow-xl border-4 border-white/20"
            />
            <div>
              <h3 className="text-2xl font-bold font-arabic bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                بلا حدود للحلويات
              </h3>
              <p className="text-blue-200 text-sm">Unlimited Sweets</p>
            </div>
          </div>
          
          <p className="text-blue-100 font-arabic leading-relaxed max-w-2xl mx-auto">
            متجر متخصص ببيع أفضل الحلويات والمشروبات الطازجة بجودة عالية وطعم استثنائي
          </p>
        </div>

        {/* Quick Navigation Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                to={link.href}
                className="group bg-white/10 hover:bg-white/20 rounded-2xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm border border-white/10"
              >
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-3 rounded-xl mx-auto w-fit mb-2 group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-arabic text-blue-100 group-hover:text-white transition-colors">
                    {link.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Categories Pills */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold font-arabic text-center mb-4 text-yellow-400">
            أقسام المنتجات
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.href}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-red-600 px-4 py-2 rounded-full text-sm font-arabic transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a 
                key={index} 
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : '_self'}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : ''}
                className={`bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 ${info.bgColor} transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-pointer`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-all duration-300`}>
                    <Icon className={`h-5 w-5 ${info.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <span className="text-blue-100 font-arabic text-sm flex-1 group-hover:text-white transition-colors">
                    {info.text}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Social Media */}
        <div className="text-center">
          <h4 className="text-lg font-semibold font-arabic mb-4 text-yellow-400">
            تابعونا على
          </h4>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`bg-white/10 ${social.color} p-3 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm border border-white/10 group`}
                  aria-label={social.name}
                >
                  <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-blue-200 text-sm font-arabic">
                بلا حدود للحلويات
              </span>
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
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
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

export default Footer;
