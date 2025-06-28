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
    { icon: ShoppingCart, label: "السلة", path: "#", count: cartCount, onClick: handleCartClick },
    { icon: Heart, label: "المفضلة", path: "#", count: favoritesCount, onClick: handleFavoritesClick },
    { icon: User, label: "لوحة التحكم", path: "#", onClick: () => setAdminDialogOpen(true) }
  ];

  function isActive(path: string) {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  }

  function handleCartClick() {
    setTimeout(() => {
      const trigger = document.querySelector('[data-cart-trigger]') as HTMLButtonElement;
      trigger?.click();
    }, 100);
  }

  function handleFavoritesClick() {
    setTimeout(() => {
      const trigger = document.querySelector('[data-favorites-trigger]') as HTMLButtonElement;
      trigger?.click();
    }, 100);
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200 rounded-t-xl shadow-md">
        <div className="flex justify-around items-center px-3 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            const commonClasses = `group flex flex-col items-center justify-center min-w-[50px] relative transition-all duration-200 ${
              active ? "text-blue-600" : "text-gray-500 hover:text-blue-500"
            }`;

            const iconWithBadge = (
              <div className="relative">
                <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {item.count && item.count > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 text-[9px] bg-red-600 text-white p-0 flex items-center justify-center">
                    {item.count > 99 ? "99+" : item.count}
                  </Badge>
                )}
              </div>
            );

            const label = (
              <span className="text-[10px] mt-1 font-arabic group-hover:font-semibold transition-all">
                {item.label}
              </span>
            );

            const activeDot = active && (
              <span className="absolute bottom-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-0.5"></span>
            );

            const content = (
              <>
                {iconWithBadge}
                {label}
                {activeDot}
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
