
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Home,
  Grid3X3,
  Info,
  MessageCircle
} from "lucide-react";
import FooterHeader from "./footer/FooterHeader";
import FooterNav from "./footer/FooterNav";
import FooterCategories from "./footer/FooterCategories";
import FooterContact from "./footer/FooterContact";
import FooterSocial from "./footer/FooterSocial";
import FooterBottom from "./footer/FooterBottom";

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
    <footer className="bg-gradient-to-br from-blue-800 via-blue-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FooterHeader />
        <FooterNav quickLinks={quickLinks} />
        <FooterCategories categories={categories} />
        <FooterContact contactInfo={contactInfo} />
        <FooterSocial socialLinks={socialLinks} />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
