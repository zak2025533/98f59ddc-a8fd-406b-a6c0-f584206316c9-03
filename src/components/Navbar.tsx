import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import SearchDialog from "./SearchDialog";
import { CartSheet } from "./CartSheet";
import { FavoritesSheet } from "./FavoritesSheet";
import CategoriesDialog from "./CategoriesDialog";
import AdminDialog from "./AdminDialog";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = true; // تحكم في ظهور زر المشرف

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => setIsMenuOpen(false);

  // إغلاق القائمة عند تغيير حجم الشاشة إلى أكبر من md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <a href="#home" onClick={onClick} className="hover:text-blue-200 transition-colors font-arabic py-2">الرئيسية</a>
      <div className="py-2">
        <CategoriesDialog />
      </div>
      <a href="#products" onClick={onClick} className="hover:text-blue-200 transition-colors font-arabic py-2">المنتجات</a>
      <a href="#about" onClick={onClick} className="hover:text-blue-200 transition-colors font-arabic py-2">من نحن</a>
      <a href="#contact" onClick={onClick} className="hover:text-blue-200 transition-colors font-arabic py-2">تواصل معنا</a>
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center py-4">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 space-x-reverse">
            <img 
              src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png" 
              alt="بلا حدود للحلويات" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-2xl font-bold font-arabic">بلا حدود للحلويات</h1>
              <p className="text-sm opacity-90 font-arabic">حلويات شرقية وغربية</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <SearchDialog />
            <FavoritesSheet />
            <CartSheet />
            {isAdmin && <AdminDialog />}
            {/* Mobile Menu Toggle */}
            <Button
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
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
          <div className="md:hidden py-4 border-t border-blue-500 transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-3">
              <NavLinks onClick={handleLinkClick} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
