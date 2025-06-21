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
              alt="ط¨ظ„ط§ ط­ط¯ظˆط¯ ظ„ظ„ط­ظ„ظˆظٹط§طھ" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-2xl font-bold font-arabic">ط¨ظ„ط§ ط­ط¯ظˆط¯ ظ„ظ„ط­ظ„ظˆظٹط§طھ</h1>
              <p className="text-sm opacity-90 font-arabic">ط­ظ„ظˆظٹط§طھ ط´ط±ظ‚ظٹط© ظˆط؛ط±ط¨ظٹط©</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <a href="#home" className="hover:text-blue-200 transition-colors font-arabic">ط§ظ„ط±ط¦ظٹط³ظٹط©</a>
            <CategoriesDialog />
            <a href="#products" className="hover:text-blue-200 transition-colors font-arabic">ط§ظ„ظ…ظ†طھط¬ط§طھ</a>
            <a href="#about" className="hover:text-blue-200 transition-colors font-arabic">ظ…ظ† ظ†ط­ظ†</a>
            <a href="#contact" className="hover:text-blue-200 transition-colors font-arabic">طھظˆط§طµظ„ ظ…ط¹ظ†ط§</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 space-x-reverse">
            <SearchDialog />
            <FavoritesSheet />
            <CartSheet />
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
              <a href="#home" className="hover:text-blue-200 transition-colors font-arabic py-2">ط§ظ„ط±ط¦ظٹط³ظٹط©</a>
              <div className="py-2">
                <CategoriesDialog />
              </div>
              <a href="#products" className="hover:text-blue-200 transition-colors font-arabic py-2">ط§ظ„ظ…ظ†طھط¬ط§طھ</a>
              <a href="#about" className="hover:text-blue-200 transition-colors font-arabic py-2">ظ…ظ† ظ†ط­ظ†</a>
              <a href="#contact" className="hover:text-blue-200 transition-colors font-arabic py-2">طھظˆط§طµظ„ ظ…ط¹ظ†ط§</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
