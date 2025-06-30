import { ReactNode, useState } from "react";
import BottomNavigation from "./BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartSheet } from "@/components/CartSheet";
import { FavoritesSheet } from "@/components/FavoritesSheet";

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const MobileLayout = ({ children, showBottomNav = true }: MobileLayoutProps) => {
  const isMobile = useIsMobile();

  // حالات التحكم بفتح السلة والمفضلة
  const [openCart, setOpenCart] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main content with bottom padding on mobile to accommodate bottom nav */}
      <main className={`flex-1 ${showBottomNav && isMobile ? 'pb-20' : ''}`}>
        {children}
      </main>
      
      {/* Bottom Navigation - only show on mobile */}
      {showBottomNav && isMobile && (
        <BottomNavigation
          onOpenCart={() => setOpenCart(true)}
          onOpenFavorites={() => setOpenFavorites(true)}
        />
      )}

      {/* Cart Sheet */}
      <CartSheet open={openCart} onOpenChange={setOpenCart} />

      {/* Favorites Sheet */}
      <FavoritesSheet open={openFavorites} onOpenChange={setOpenFavorites} />
    </div>
  );
};

export default MobileLayout;
