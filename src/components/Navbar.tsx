import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import SearchDialog from "./SearchDialog";
import { CartSheet } from "./CartSheet";
import { FavoritesSheet } from "./FavoritesSheet";
import CategoriesDialog from "./CategoriesDialog";
import AdminDialog from "./AdminDialog";

const links = [
  { href: "#home", label: "الرئيسية" },
  { href: "#products", label: "المنتجات" },
  { href: "#about", label: "من نحن" },
  { href: "#contact", label: "تواصل معنا" },
];

const navLinkClass = "hover:text-blue-200 transition-colors font-arabic";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            {links.map((link) => (
              <a key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            ))}
            <CategoriesDialog />
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
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden text-white hover:bg-white/20"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden h-screen py-6 px-6 bg-blue-700 border-t border-blue-500">
            <div className="flex flex-col space-y-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-lg font-arabic font-medium hover:text-blue-200"
                >
                  {link.label}
                </a>
              ))}
              <CategoriesDialog />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
