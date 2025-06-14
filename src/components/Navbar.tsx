
import { useState } from "react";
import { Menu, Search, ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartSheet } from "./CartSheet";
import { FavoritesSheet } from "./FavoritesSheet";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600 font-arabic">متجري</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-arabic">الرئيسية</a>
            <a href="/category" className="text-gray-700 hover:text-blue-600 font-arabic">الفئات</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-arabic">من نحن</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-arabic">اتصل بنا</a>
            <a href="/admin" className="text-gray-700 hover:text-blue-600 font-arabic">الإدارة</a>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            
            <FavoritesSheet />
            
            <CartSheet />
            
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-6">
                    <a href="/" className="text-gray-700 hover:text-blue-600 font-arabic text-lg">الرئيسية</a>
                    <a href="/category" className="text-gray-700 hover:text-blue-600 font-arabic text-lg">الفئات</a>
                    <a href="/about" className="text-gray-700 hover:text-blue-600 font-arabic text-lg">من نحن</a>
                    <a href="/contact" className="text-gray-700 hover:text-blue-600 font-arabic text-lg">اتصل بنا</a>
                    <a href="/admin" className="text-gray-700 hover:text-blue-600 font-arabic text-lg">الإدارة</a>
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
