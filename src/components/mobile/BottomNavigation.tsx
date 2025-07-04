
import { Home, Grid3X3, ShoppingCart, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/cart/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Admin from "@/pages/Admin";

interface BottomNavigationProps {
  onOpenCart: () => void;
  onOpenFavorites: () => void;
}

const BottomNavigation = ({ onOpenCart, onOpenFavorites }: BottomNavigationProps) => {
  const location = useLocation();
  const { cartCount } = useCart();
  const { favoriteCount } = useFavorites();
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "الرئيسية", path: "/" },
    { icon: Grid3X3, label: "المنتجات", path: "/category" },
    { icon: ShoppingCart, label: "السلة", path: "#", count: cartCount, onClick: onOpenCart },
    { icon: Heart, label: "المفضلة", path: "#", count: favoriteCount, onClick: onOpenFavorites },
    { icon: User, label: "لوحة التحكم", path: "#", onClick: () => setAdminDialogOpen(true) }
  ];

  function isActive(path: string) {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe-area-inset-bottom">
        <div className="glass-card bg-white/95 backdrop-blur-xl border-t border-gray-200/50 rounded-t-3xl shadow-xl">
          {/* شريط علوي ناعم */}
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mt-2 mb-3"></div>
          
          <div className="flex justify-around items-center px-4 py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              const commonClasses = `group flex flex-col items-center justify-center min-w-[60px] p-3 rounded-2xl transition-all duration-300 ${
                active 
                  ? "text-blue-600 bg-blue-50 shadow-lg scale-105" 
                  : "text-gray-500 hover:text-blue-500 hover:bg-gray-50 active:scale-95"
              }`;

              const iconWithBadge = (
                <div className="relative mb-1">
                  <div className={`p-2 rounded-xl transition-all duration-200 ${
                    active ? "bg-blue-100" : "group-hover:bg-gray-100"
                  }`}>
                    <Icon className={`h-5 w-5 transition-all duration-200 ${
                      active ? "scale-110" : "group-hover:scale-105"
                    }`} />
                  </div>
                  {item.count && item.count > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 text-[10px] bg-gradient-to-r from-red-500 to-red-600 text-white p-0 flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                      {item.count > 99 ? "99+" : item.count}
                    </Badge>
                  )}
                </div>
              );

              const label = (
                <span className={`text-[10px] font-arabic transition-all duration-200 ${
                  active ? "font-bold" : "font-medium group-hover:font-semibold"
                }`}>
                  {item.label}
                </span>
              );

              const content = (
                <>
                  {iconWithBadge}
                  {label}
                </>
              );

              if (item.onClick) {
                return (
                  <button key={item.label} onClick={item.onClick} className={commonClasses}>
                    {content}
                  </button>
                );
              }

              return (
                <Link key={item.label} to={item.path} className={commonClasses}>
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* لوحة التحكم (admin) */}
      <Dialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-y-auto p-0 m-2">
          <DialogHeader className="sr-only">
            <DialogTitle>لوحة التحكم</DialogTitle>
          </DialogHeader>
          <div className="w-full h-full">
            <Admin />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BottomNavigation;
