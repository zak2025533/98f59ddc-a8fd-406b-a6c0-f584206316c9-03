
import { useState } from "react";
import { Menu, Search, ShoppingCart, Heart, Home, Grid3X3, Info, MessageCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "./CartSheet";
import { FavoritesSheet } from "./FavoritesSheet";
import { useNativeApp } from "@/hooks/useNativeApp";

const SimpleNavbar = () => {
  const { isNative } = useNativeApp();

  const navItems = [
    { name: "الرئيسية", href: "/", icon: Home },
    { name: "الفئات", href: "/category", icon: Grid3X3 },
    { name: "من نحن", href: "/about", icon: Info },
    { name: "اتصل بنا", href: "/contact", icon: MessageCircle },
    { name: "الإدارة", href: "/admin", icon: Settings }
  ];

  return (
    <nav className={`bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg ${isNative ? 'pt-safe-area-inset-top' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white font-arabic">بلا حدود للحلويات</h1>
          </div>

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
          <div className="flex items-center space-x-3 space-x-reverse">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 h-10 w-10">
              <Search className="h-5 w-5" />
            </Button>
            
            <FavoritesSheet />
            <CartSheet />

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 h-10 w-10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-white">
                  <nav className="flex flex-col space-y-4 mt-6">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a 
                          key={item.name}
                          href={item.href} 
                          className="flex items-center space-x-3 space-x-reverse text-blue-800 hover:text-purple-600 font-arabic text-lg py-3 px-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                        >
                          <Icon className="h-6 w-6" />
                          <span>{item.name}</span>
                        </a>
                      );
                    })}
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

export default SimpleNavbar;
