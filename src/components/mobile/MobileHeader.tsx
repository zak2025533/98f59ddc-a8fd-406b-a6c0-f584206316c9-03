
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchDialog from "@/components/SearchDialog";
import { FavoritesSheet } from "@/components/FavoritesSheet";
import { CartSheet } from "@/components/CartSheet";
import AdminDialog from "@/components/AdminDialog";

interface MobileHeaderProps {
  title: string;
  showSearch?: boolean;
}

const MobileHeader = ({ title, showSearch = true }: MobileHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const actionItems = [
    { 
      component: <SearchDialog key="search" />, 
      label: "بحث" 
    },
    { 
      component: (
        <Button
          key="favorites"
          variant="ghost"
          size="icon"
          onClick={() => setFavoritesOpen(true)}
          className="text-white hover:bg-white/20"
        >
          <span>❤️</span>
        </Button>
      ), 
      label: "المفضلة" 
    },
    { 
      component: (
        <Button 
          key="cart"
          variant="ghost"
          size="icon"
          onClick={() => setCartOpen(true)}
          className="text-white hover:bg-white/20"
        >
          <span>🛒</span>
        </Button>
      ), 
      label: "السلة" 
    },
    { 
      component: <AdminDialog key="admin" />, 
      label: "لوحة التحكم" 
    },
  ];

  return (
    <>
      {/* الشريط العلوي المحدث */}
      <header className="sticky top-0 z-40 pt-safe-area-inset-top">
        <div className="glass-card backdrop-blur-xl bg-gradient-to-r from-blue-500/90 to-purple-600/90 border-0 rounded-none shadow-lg">
          <div className="flex items-center justify-between px-6 py-4">
            {/* اللوجو والعنوان */}
            <div className="flex items-center space-x-3 space-x-reverse fade-in-up">
              <div className="relative">
                <img
                  src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png"
                  alt="بلا حدود للحلويات"
                  className="h-10 w-10 rounded-full shadow-lg ring-2 ring-white/30"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
              </div>
              <h1 className="text-xl font-bold font-arabic text-white truncate drop-shadow-sm">{title}</h1>
            </div>

            {/* أيقونات البحث + زر القائمة */}
            <div className="flex items-center space-x-2 space-x-reverse">
              {showSearch && (
                <div className="scale-in">
                  <SearchDialog />
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="modern-button text-white hover:bg-white/20 bg-white/10 h-10 w-10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          {/* شريط الحالة الناعم */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
      </header>

      {/* القائمة الجانبية للموبايل عند فتح القائمة */}
      {isMenuOpen && (
        <div className="md:hidden h-screen py-6 px-6 bg-blue-700 border-t border-blue-500 z-30">
          <div className="flex flex-col space-y-5">
            {/* أيقونات رأسية مع تسميات */}
            {actionItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 space-x-reverse bg-white/10 p-2 rounded-lg"
              >
                {item.component}
                <span className="text-white font-arabic">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sheets */}
      <FavoritesSheet open={favoritesOpen} onOpenChange={setFavoritesOpen} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
};

export default MobileHeader;
