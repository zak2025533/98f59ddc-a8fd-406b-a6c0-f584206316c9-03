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
    { icon: Home, label: "الرئيسية", path: "/", count: 0 },
    { icon: Grid3X3, label: "المنتجات", path: "/category", count: 0 },
    { icon: ShoppingCart, label: "السلة", path: "#", count: cartCount, isCart: true },
    { icon: Heart, label: "المفضلة", path: "#", count: favoritesCount, isFavorites: true },
    { icon: User, label: "لوحة التحكم", path: "#", count: 0, isAdmin: true }
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleCartClick = () => {
    try {
      const cartButton = document.querySelector('[data-cart-trigger]') as HTMLButtonElement;
      cartButton?.click();
    } catch (error) {
      console.error("Error opening cart:", error);
    }
  };

  const handleFavoritesClick = () => {
    try {
      const favButton = document.querySelector('[data-favorites-trigger]') as HTMLButtonElement;
      favButton?.click();
    } catch (error) {
      console.error("Error opening favorites:", error);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center py-2 px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const baseClass =
              "flex flex-col items-center justify-center p-2 min-w-[48px] sm:min-w-[60px] relative transition-colors duration-200";

            const iconClass = "sm:h-6 sm:w-6 h-5 w-5";
            const badgeClass =
              "absolute -top-1 -right-1 sm:h-5 sm:w-5 h-4 w-4 text-[10px] sm:text-xs bg-red-500 text-white p-0 flex items-center justify-center rounded-full";

            const labelClass = "text-[10px] sm:text-xs mt-1 font-arabic";

            if (item.isCart) {
              return (
                <button
                  key={item.label}
                  className={`${baseClass} ${active ? "text-blue-600" : "text-gray-500"}`}
                  onClick={handleCartClick}
                >
                  <div className="relative">
                    <Icon className={iconClass} />
                    {item.count > 0 && (
                      <Badge className={badgeClass}>
                        {item.count > 99 ? "99+" : item.count}
                      </Badge>
                    )}
                  </div>
                  <span className={labelClass}>{item.label}</span>
                </button>
              );
            }

            if (item.isFavorites) {
              return (
                <button
                  key={item.label}
                  className={`${baseClass} ${active ? "text-blue-600" : "text-gray-500"}`}
                  onClick={handleFavoritesClick}
                >
                  <div className="relative">
                    <Icon className={iconClass} />
                    {item.count > 0 && (
                      <Badge className={badgeClass}>
                        {item.count > 99 ? "99+" : item.count}
                      </Badge>
                    )}
                  </div>
                  <span className={labelClass}>{item.label}</span>
                </button>
              );
            }

            if (item.isAdmin) {
              return (
                <button
                  key={item.label}
                  className={`${baseClass} ${adminDialogOpen ? "text-blue-600" : "text-gray-500"}`}
                  onClick={() => setAdminDialogOpen(true)}
                >
                  <div className="relative">
                    <Icon className={iconClass} />
                  </div>
                  <span className={labelClass}>{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={`${item.label}-${item.path}`}
                to={item.path}
                className={`${baseClass} ${active ? "text-blue-600" : "text-gray-500"}`}
              >
                <div className="relative">
                  <Icon className={iconClass} />
                  {item.count > 0 && (
                    <Badge className={badgeClass}>
                      {item.count > 99 ? "99+" : item.count}
                    </Badge>
                  )}
                </div>
                <span className={labelClass}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Admin Panel Dialog */}
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
