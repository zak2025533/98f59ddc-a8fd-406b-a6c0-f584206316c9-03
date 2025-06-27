import { Home, Grid3X3, ShoppingCart, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Admin from "@/pages/Admin";

const BottomNavigation = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const { favoriteItems } = useFavorites();
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favoriteItems.length;

  const navItems = [
    { icon: Home, label: "الرئيسية", path: "/" },
    { icon: Grid3X3, label: "المنتجات", path: "/category" },
    { icon: ShoppingCart, label: "السلة", path: "#", count: cartCount, isCart: true },
    { icon: Heart, label: "المفضلة", path: "#", count: favoritesCount, isFavorites: true },
    { icon: User, label: "لوحة التحكم", path: "#", isAdmin: true }
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleCartClick = () => {
    setTimeout(() => {
      const trigger = document.querySelector('[data-cart-trigger]') as HTMLButtonElement;
      trigger?.click();
    }, 100);
  };

  const handleFavoritesClick = () => {
    setTimeout(() => {
      const trigger = document.querySelector('[data-favorites-trigger]') as HTMLButtonElement;
      trigger?.click();
    }, 100);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pt-2 pb-safe-area-inset-bottom rounded-t-xl shadow-md backdrop-blur-md">
        <div className="flex justify-around items-center px-4 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            const commonClasses = `flex flex-col items-center justify-center min-w-[60px] relative touch-target ${
              active ? "text-blue-600" : "text-gray-500"
            }`;

            if (item.isCart) {
              return (
                <button key={item.label} onClick={handleCartClick} className={commonClasses}>
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                    {item.count! > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 text-xs bg-red-500 text-white p-0 flex items-center justify-center">
                        {item.count! > 99 ? "99+" : item.count}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs mt-1 font-arabic">{item.label}</span>
                </button>
              );
            }

            if (item.isFavorites) {
              return (
                <button key={item.label} onClick={handleFavoritesClick} className={commonClasses}>
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                    {item.count! > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 text-xs bg-red-500 text-white p-0 flex items-center justify-center">
                        {item.count! > 99 ? "99+" : item.count}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs mt-1 font-arabic">{item.label}</span>
                </button>
              );
            }

            if (item.isAdmin) {
              return (
                <button
                  key={item.label}
                  onClick={() => setAdminDialogOpen(true)}
                  className={commonClasses}
                >
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs mt-1 font-arabic">{item.label}</span>
                </button>
              );
            }

            return (
              <Link key={item.label} to={item.path} className={commonClasses}>
                <div className="relative">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs mt-1 font-arabic">{item.label}</span>
              </Link>
            );
          })}
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
