
import { Menu, Search, ShoppingCart, Heart, Home, LayoutGrid, Info, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "./CartSheet";
import { FavoritesSheet } from "./FavoritesSheet";
import { useNativeApp } from "@/hooks/useNativeApp";
import SearchDialog from "./SearchDialog";

const navItems = [
    { name: "الرئيسية", href: "/", icon: Home },
    { name: "الفئات", href: "/category", icon: LayoutGrid },
    { name: "من نحن", href: "/about", icon: Info },
    { name: "اتصل بنا", href: "/contact", icon: MessageCircle },
    { name: "الإدارة", href: "/admin", icon: Settings }
];

const Navbar = () => {
  const { isNative } = useNativeApp();

  const mobileMenuItemClasses = "flex w-full items-center space-x-3 space-x-reverse text-blue-800 hover:bg-blue-50 font-arabic text-base py-3 px-4 rounded-lg font-semibold transition-colors justify-start h-auto";
  const mobileMenuIconClasses = "h-6 w-6 text-blue-600 !ml-0";

  return (
    <nav className={`bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg ${isNative ? 'pt-safe-area-inset-top' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center space-x-2 rtl:space-x-reverse">
            <img src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png" alt="بلا حدود للحلويات" className="h-10 w-10 hidden sm:block" />
            <h1 className="text-xl sm:text-2xl font-bold text-white font-arabic">بلا حدود للحلويات</h1>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="flex items-center space-x-2 space-x-reverse text-white hover:text-yellow-300 transition-colors duration-200 font-semibold group"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-arabic">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4 space-x-reverse">
            <SearchDialog />
            
            <div className="hidden md:flex items-center space-x-2 space-x-reverse">
              <FavoritesSheet />
              <CartSheet />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white">
                  <nav className="flex flex-col space-y-2 mt-6">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a 
                          key={item.name}
                          href={item.href} 
                          className="flex items-center space-x-3 space-x-reverse text-blue-800 hover:bg-blue-50 font-arabic text-base py-3 px-4 rounded-lg font-semibold transition-colors"
                        >
                          <Icon className="h-6 w-6 text-blue-600" />
                          <span>{item.name}</span>
                        </a>
                      );
                    })}
                    <div className="border-t my-2 -mx-6" />
                    <FavoritesSheet triggerClassName={mobileMenuItemClasses} iconClassName={mobileMenuIconClasses} />
                    <CartSheet triggerClassName={mobileMenuItemClasses} iconClassName={mobileMenuIconClasses} />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
