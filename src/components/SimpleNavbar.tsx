
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
    <nav className={`bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600 shadow-lg ${isNative ? 'pt-safe-area-inset-top' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white font-arabic drop-shadow-lg">بلا حدود للحلويات</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="flex items-center space-x-2 space-x-reverse text-white hover:text-orange-100 transition-colors duration-200 font-semibold group"
                >
                  <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-arabic">{item.name}</span>
                </a>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
              <Search className="h-5 w-5" />
            </Button>
            
            <FavoritesSheet />
            <CartSheet />

            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-gradient-to-br from-orange-50 to-yellow-50">
                  <nav className="flex flex-col space-y-4 mt-6">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a 
                          key={item.name}
                          href={item.href} 
                          className="flex items-center space-x-3 space-x-reverse text-orange-800 hover:text-orange-600 font-arabic text-lg py-3 px-2 rounded-lg hover:bg-orange-100 transition-all duration-200"
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
