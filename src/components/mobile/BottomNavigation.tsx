import {
  Home, Grid3X3, ShoppingCart, Heart, User
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Admin from "@/pages/Admin";

const BottomNavigation = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const { favoriteItems } = useFavorites();
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const favoritesCount = favoriteItems.length;

  const navItems = [
    { icon: Home, label: "الرئيسية", path: "/", count: 0 },
    { icon: Grid3X3, label: "المنتجات", path: "/category", count: 0 },
    {
      icon: ShoppingCart,
      label: "السلة",
      path: "#",
      count: cartCount,
      isCart: true,
    },
    {
      icon: Heart,
      label: "المفضلة",
      path: "#",
      count: favoritesCount,
      isFavorites: true,
    },
    {
      icon: User,
      label: "لوحة التحكم",
      path: "#",
      count: 0,
      isAdmin: true,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleCartClick = () => {
    setTimeout(() => {
      const cartButton = document.querySelector('[data-cart-trigger]');
      if (cartButton instanceof HTMLButtonElement) cartButton.click();
    }, 100);
  };

  const handleFavoritesClick = () => {
    setTimeout(() => {
      const favButton = document.querySelector('[data-favorites-trigger]');
      if (favButton instanceof HTMLButtonElement) favButton.click();
    }, 100);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pt-2 pb-safe-area-inset-bottom shadow-md">
        <div className="flex justify-around items-center px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            const commonClass = `flex flex-col items-center justify-center p-2 min-w-[60px] relative touch-target ${active ? "text-blue-600" : "text-gray-500"}`;

            const iconWithBadge = (
              <div className="relative">
                <Icon className="h-6 w-6" />
                {item.count > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                    {item.count > 99 ? "99+" : item.count}
                  </Badge>
                )}
              </div>
            );

            const label = (
              <span className="text-xs mt-1 font-arabic">{item.label}</span>
            );

            if (item.isCart) {
              return (
                <button key={item.label} className={commonClass} onClick={handleCartClick}>
                  {iconWithBadge}
                  {label}
                </button>
              );
            }

            if (item.isFavorites) {
              return (
                <button key={item.label} className={commonClass} onClick={handleFavoritesClick}>
                  {iconWithBadge}
                  {label}
                </button>
              );
            }

            if (item.isAdmin) {
              return (
                <button
                  key={item.label}
                  className={commonClass}
                  onClick={() => setAdminDialogOpen(true)}
                >
                  {iconWithBadge}
                  {label}
                </button>
              );
            }

            return (
              <Link key={item.label} to={item.path} className={commonClass}>
                {iconWithBadge}
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

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
