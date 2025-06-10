
import { ShoppingCart, User, Search, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold sweet-gradient bg-clip-text text-transparent">
                بلا حدود للحلويات
              </h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="ابحث عن حلوياتك المفضلة..." 
                className="pl-10 pr-4"
                dir="rtl"
              />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5 ml-2" />
              المفضلة
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5 ml-2" />
              سلة التسوق
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="sm">
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
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <div className="mb-3">
                <Input 
                  placeholder="ابحث عن حلوياتك المفضلة..." 
                  className="w-full"
                  dir="rtl"
                />
              </div>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="h-5 w-5 ml-2" />
                المفضلة
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <ShoppingCart className="h-5 w-5 ml-2" />
                سلة التسوق
              </Button>
              <Button variant="ghost" className="w-full justify-start">
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
