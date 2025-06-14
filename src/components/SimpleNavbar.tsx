
import { useState } from "react";
import { Menu, Home, Grid, Info, Phone, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNativeApp } from "@/hooks/useNativeApp";

const SimpleNavbar = () => {
  const { isNative } = useNativeApp();

  return (
    <nav className={`bg-blue-600 shadow-lg ${isNative ? 'pt-safe-area-inset-top' : ''}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white font-arabic">بلا حدود للحلويات</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <a href="/" className="flex flex-col items-center text-white hover:text-yellow-300 transition-colors duration-200 p-2">
              <Home className="h-6 w-6 mb-1" />
              <span className="text-sm font-arabic">الرئيسية</span>
            </a>
            <a href="/category" className="flex flex-col items-center text-white hover:text-yellow-300 transition-colors duration-200 p-2">
              <Grid className="h-6 w-6 mb-1" />
              <span className="text-sm font-arabic">الفئات</span>
            </a>
            <a href="/about" className="flex flex-col items-center text-white hover:text-yellow-300 transition-colors duration-200 p-2">
              <Info className="h-6 w-6 mb-1" />
              <span className="text-sm font-arabic">من نحن</span>
            </a>
            <a href="/contact" className="flex flex-col items-center text-white hover:text-yellow-300 transition-colors duration-200 p-2">
              <Phone className="h-6 w-6 mb-1" />
              <span className="text-sm font-arabic">اتصل بنا</span>
            </a>
            <a href="/admin" className="flex flex-col items-center text-white hover:text-yellow-300 transition-colors duration-200 p-2">
              <Settings className="h-6 w-6 mb-1" />
              <span className="text-sm font-arabic">الإدارة</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white">
                <nav className="flex flex-col space-y-6 mt-8">
                  <a href="/" className="flex items-center text-blue-800 hover:text-blue-600 font-arabic text-lg py-3 transition-colors">
                    <Home className="h-6 w-6 ml-3" />
                    الرئيسية
                  </a>
                  <a href="/category" className="flex items-center text-blue-800 hover:text-blue-600 font-arabic text-lg py-3 transition-colors">
                    <Grid className="h-6 w-6 ml-3" />
                    الفئات
                  </a>
                  <a href="/about" className="flex items-center text-blue-800 hover:text-blue-600 font-arabic text-lg py-3 transition-colors">
                    <Info className="h-6 w-6 ml-3" />
                    من نحن
                  </a>
                  <a href="/contact" className="flex items-center text-blue-800 hover:text-blue-600 font-arabic text-lg py-3 transition-colors">
                    <Phone className="h-6 w-6 ml-3" />
                    اتصل بنا
                  </a>
                  <a href="/admin" className="flex items-center text-blue-800 hover:text-blue-600 font-arabic text-lg py-3 transition-colors">
                    <Settings className="h-6 w-6 ml-3" />
                    الإدارة
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
