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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex flex-col">
      {/* المحتوى الرئيسي مع هامش سفلي إذا ظهر الشريط السفلي */}
      <main className={`flex-1 transition-all duration-300 ${showBottomNav && isMobile ? 'pb-24' : ''}`}>
        <div className="fade-in-up">
          {children}
        </div>
      </main>

      {/* الشريط السفلي (يظهر فقط على الجوال) */}
      {showBottomNav && isMobile && (
        <div className="mobile-slide-up">
          <BottomNavigation
            onOpenCart={() => setOpenCart(true)}
            onOpenFavorites={() => setOpenFavorites(true)}
          />
        </div>
      )}

      {/* نافذة السلة */}
      <CartSheet open={openCart} onOpenChange={setOpenCart} />

      {/* نافذة المفضلة */}
      <FavoritesSheet open={openFavorites} onOpenChange={setOpenFavorites} />
    </div>
  );
};

export default MobileLayout;
