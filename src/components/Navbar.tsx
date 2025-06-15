
import { useState } from "react";
import { Menu, Search, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "./CartSheet";
import { FavoritesSheet } from "./FavoritesSheet";
import { useNativeApp } from "@/hooks/useNativeApp";

const Navbar = () => {
  const { isNative } = useNativeApp();

  return (
    <nav className={`bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg ${isNative ? 'pt-safe-area-inset-top' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white font-arabic">بلا حدود للحلويات</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <a href="/" className="text-white hover:text-yellow-300 font-arabic transition-colors duration-200 font-semibold">الرئيسية</a>
            <a href="/category" className="text-white hover:text-yellow-300 font-arabic transition-colors duration-200 font-semibold">الفئات</a>
            <a href="/about" className="text-white hover:text-yellow-300 font-arabic transition-colors duration-200 font-semibold">من نحن</a>
            <a href="/contact" className="text-white hover:text-yellow-300 font-arabic transition-colors duration-200 font-semibold">اتصل بنا</a>
            <a href="/admin" className="text-white hover:text-yellow-300 font-arabic transition-colors duration-200 font-semibold">الإدارة</a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" size="sm" className="touch-target text-white hover:bg-white/20">
              <Search className="h-5 w-5" />
            </Button>
            
            <FavoritesSheet />
            
            <CartSheet />

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="touch-target text-white hover:bg-white/20">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
                  <nav className="flex flex-col space-y-4 mt-6">
                    <a href="/" className="text-blue-800 hover:text-yellow-500 font-arabic text-lg py-2 font-semibold transition-colors">الرئيسية</a>
                    <a href="/category" className="text-blue-800 hover:text-yellow-500 font-arabic text-lg py-2 font-semibold transition-colors">الفئات</a>
                    <a href="/about" className="text-blue-800 hover:text-yellow-500 font-arabic text-lg py-2 font-semibold transition-colors">من نحن</a>
                    <a href="/contact" className="text-blue-800 hover:text-yellow-500 font-arabic text-lg py-2 font-semibold transition-colors">اتصل بنا</a>
                    <a href="/admin" className="text-blue-800 hover:text-yellow-500 font-arabic text-lg py-2 font-semibold transition-colors">الإدارة</a>
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
