
import { ShoppingCart, User, Search, Menu, Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-sweet-orange/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 group cursor-pointer">
              <h1 className="text-3xl font-bold sweet-gradient bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 font-arabic">
                بلا حدود للحلويات
              </h1>
              <p className="text-xs text-muted-foreground font-arabic">طعم لا يُقاوم</p>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="ابحث عن حلوياتك المفضلة..." 
                className="pl-12 pr-4 h-12 border-2 border-sweet-orange/20 focus:border-sweet-orange bg-white/80 backdrop-blur-sm font-arabic"
                dir="rtl"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 space-x-reverse">
            <Button variant="ghost" size="sm" className="h-12 px-4 hover:bg-sweet-orange/10 font-arabic">
              <Home className="h-5 w-5 ml-2" />
              الرئيسية
            </Button>
            <Button variant="ghost" size="sm" className="h-12 px-4 hover:bg-sweet-orange/10 font-arabic">
              <Heart className="h-5 w-5 ml-2" />
              المفضلة
            </Button>
            <Button variant="ghost" size="sm" className="relative h-12 px-4 hover:bg-sweet-orange/10 font-arabic">
              <ShoppingCart className="h-5 w-5 ml-2" />
              سلة التسوق
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
            <Button variant="outline" size="sm" className="h-12 px-6 border-sweet-orange text-sweet-orange hover:bg-sweet-orange hover:text-white transition-all duration-300 font-arabic">
              <User className="h-5 w-5 ml-2" />
              تسجيل الدخول
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-12 w-12"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-sweet-orange/20 bg-white/95 backdrop-blur-md">
              <div className="mb-4">
                <Input 
                  placeholder="ابحث عن حلوياتك المفضلة..." 
                  className="w-full h-12 border-2 border-sweet-orange/20 font-arabic"
                  dir="rtl"
                />
              </div>
              <Button variant="ghost" className="w-full justify-start h-12 font-arabic">
                <Home className="h-5 w-5 ml-2" />
                الرئيسية
              </Button>
              <Button variant="ghost" className="w-full justify-start h-12 font-arabic">
                <Heart className="h-5 w-5 ml-2" />
                المفضلة
              </Button>
              <Button variant="ghost" className="w-full justify-start h-12 font-arabic">
                <ShoppingCart className="h-5 w-5 ml-2" />
                سلة التسوق
              </Button>
              <Button variant="ghost" className="w-full justify-start h-12 font-arabic">
                <User className="h-5 w-5 ml-2" />
                تسجيل الدخول
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
