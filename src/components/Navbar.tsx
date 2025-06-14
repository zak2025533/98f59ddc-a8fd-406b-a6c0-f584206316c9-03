
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, ShoppingCart, Heart, User, Home, Grid3X3, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { CartSheet } from "./CartSheet";
import { FavoritesSheet } from "./FavoritesSheet";
import NotificationIcon from "./NotificationIcon";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { favoriteCount } = useFavorites();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { icon: Home, label: "الرئيسية", href: "/" },
    { icon: Grid3X3, label: "الأقسام", href: "#categories" },
    { icon: Phone, label: "اتصل بنا", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
            <img
              src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png"
              alt="بلا حدود للحلويات"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-blue-800 font-arabic">
                بلا حدود للحلويات
              </h1>
              <p className="text-xs text-blue-600 font-arabic">Unlimited Sweets</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors font-arabic text-sm font-medium"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notifications */}
            <NotificationIcon />

            {/* Favorites - Hidden on very small screens */}
            <div className="hidden sm:block">
              <FavoritesSheet />
            </div>

            {/* Cart */}
            <CartSheet />

            {/* Admin Link - Hidden on small screens */}
            <Link to="/admin" className="hidden md:block">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-10 sm:h-12 px-3 sm:px-4 hover:bg-blue-50 text-blue-700 font-arabic transition-colors"
              >
                <User className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                <span className="hidden lg:inline">الإدارة</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="lg:hidden h-10 w-10 p-0 hover:bg-blue-50"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-blue-100 bg-white/98 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-md text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors font-arabic"
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
              
              {/* Favorites in mobile menu */}
              <div className="sm:hidden px-3 py-2">
                <FavoritesSheet />
              </div>

              {/* Admin link in mobile menu */}
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="md:hidden flex items-center gap-3 px-3 py-3 rounded-md text-blue-700 hover:text-blue-900 hover:bg-blue-50 transition-colors font-arabic"
              >
                <User className="h-5 w-5" />
                لوحة الإدارة
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
