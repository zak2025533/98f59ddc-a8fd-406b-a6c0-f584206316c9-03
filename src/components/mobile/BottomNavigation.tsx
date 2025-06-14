
import { Home, Grid3X3, ShoppingCart, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
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
    {
      icon: Home,
      label: "الرئيسية",
      path: "/",
      count: 0
    },
    {
      icon: Grid3X3,
      label: "المنتجات",
      path: "/category",
      count: 0
    },
    {
      icon: ShoppingCart,
      label: "السلة",
      path: "#",
      count: cartCount,
      isCart: true
    },
    {
      icon: Heart,
      label: "المفضلة",
      path: "#",
      count: favoritesCount,
      isFavorites: true
    },
    {
      icon: User,
      label: "لوحة التحكم",
      path: "#",
      count: 0,
      isAdmin: true
    }
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Wait for DOM to be ready before trying to find elements
  useEffect(() => {
    console.log('BottomNavigation mounted, DOM ready');
  }, []);

  const handleCartClick = () => {
    try {
      console.log('Cart button clicked');
      // Wait a bit for DOM to be ready
      setTimeout(() => {
        const cartButton = document.querySelector('[data-cart-trigger]') as HTMLButtonElement;
        if (cartButton) {
          console.log('Cart trigger found, clicking...');
          cartButton.click();
        } else {
          console.error('Cart trigger button not found');
          // Fallback: try finding any cart sheet trigger
          const fallbackCartButton = document.querySelector('button[data-cart-trigger], [data-testid="cart-trigger"]') as HTMLButtonElement;
          if (fallbackCartButton) {
            console.log('Fallback cart trigger found, clicking...');
            fallbackCartButton.click();
          }
        }
      }, 100);
    } catch (error) {
      console.error('Error opening cart:', error);
    }
  };

  const handleFavoritesClick = () => {
    try {
      console.log('Favorites button clicked');
      // Wait a bit for DOM to be ready
      setTimeout(() => {
        const favButton = document.querySelector('[data-favorites-trigger]') as HTMLButtonElement;
        if (favButton) {
          console.log('Favorites trigger found, clicking...');
          favButton.click();
        } else {
          console.error('Favorites trigger button not found');
          // Fallback: try finding any favorites sheet trigger
          const fallbackFavButton = document.querySelector('button[data-favorites-trigger], [data-testid="favorites-trigger"]') as HTMLButtonElement;
          if (fallbackFavButton) {
            console.log('Fallback favorites trigger found, clicking...');
            fallbackFavButton.click();
          }
        }
      }, 100);
    } catch (error) {
      console.error('Error opening favorites:', error);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe-area-inset-bottom">
        <div className="flex justify-around items-center py-2 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            if (item.isCart) {
              return (
                <button
                  key={item.label}
                  className={`flex flex-col items-center justify-center p-2 min-w-[60px] relative touch-target ${
                    active ? "text-blue-600" : "text-gray-500"
                  }`}
                  onClick={handleCartClick}
                >
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                    {item.count > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                        {item.count > 99 ? "99+" : item.count}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs mt-1 font-arabic">{item.label}</span>
                </button>
              );
            }

            if (item.isFavorites) {
              return (
                <button
                  key={item.label}
                  className={`flex flex-col items-center justify-center p-2 min-w-[60px] relative touch-target ${
                    active ? "text-blue-600" : "text-gray-500"
                  }`}
                  onClick={handleFavoritesClick}
                >
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                    {item.count > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                        {item.count > 99 ? "99+" : item.count}
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
                  className={`flex flex-col items-center justify-center p-2 min-w-[60px] relative touch-target ${
                    adminDialogOpen ? "text-blue-600" : "text-gray-500"
                  }`}
                  onClick={() => setAdminDialogOpen(true)}
                >
                  <div className="relative">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs mt-1 font-arabic">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center justify-center p-2 min-w-[60px] relative touch-target ${
                  active ? "text-blue-600" : "text-gray-500"
                }`}
              >
                <div className="relative">
                  <Icon className="h-6 w-6" />
                  {item.count > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
                      {item.count > 99 ? "99+" : item.count}
                    </Badge>
                  )}
                </div>
                <span className="text-xs mt-1 font-arabic">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Admin Dialog for Mobile */}
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
