import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import SearchDialog from "./SearchDialog";
import { CartSheet } from "./CartSheet";
import { FavoritesSheet } from "./FavoritesSheet";
import CategoriesDialog from "./CategoriesDialog";
import AdminDialog from "./AdminDialog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <img 
              src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png" 
              alt="بلا حدود للحلويات" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-2xl font-bold font-arabic">بلا حدود للحلويات</h1>
              <p className="text-sm opacity-90 font-arabic">حلويات شرقية وغربية</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <a href="#home" className="hover:text-blue-200 transition-colors font-arabic">الرئيسية</a>
            <CategoriesDialog />
            <a href="#products" className="hover:text-blue-200 transition-colors font-arabic">المنتجات</a>
            <a href="#about" className="hover:text-blue-200 transition-colors font-arabic">من نحن</a>
            <a href="#contact" className="hover:text-blue-200 transition-colors font-arabic">تواصل معنا</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <SearchDialog />

            {/* ✅ عرض فقط في الشاشات المتوسطة (md) وما فوق */}
            <div className="hidden md:block">
              <FavoritesSheet />
            </div>

            <div className="hidden md:block">
              <CartSheet />
            </div>

            <AdminDialog />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden text-white hover:bg-white/20"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500">
            <div className="flex flex-col space-y-3">
              <a href="#home" className="hover:text-blue-200 transition-colors font-arabic py-2">الرئيسية</a>
              <div className="py-2">
                <CategoriesDialog />
              </div>
              <a href="#products" className="hover:text-blue-200 transition-colors font-arabic py-2">المنتجات</a>
              <a href="#about" className="hover:text-blue-200 transition-colors font-arabic py-2">من نحن</a>
              <a href="#contact" className="hover:text-blue-200 transition-colors font-arabic py-2">تواصل معنا</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
