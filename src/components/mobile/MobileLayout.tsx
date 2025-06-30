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
    <div className="min-h-screen bg-[#2563eb] text-white flex flex-col">
      {/* المحتوى الرئيسي مع هامش سفلي إذا ظهر الشريط السفلي */}
      <main className={`flex-1 ${showBottomNav && isMobile ? 'pb-20' : ''}`}>
        {children}
      </main>

      {/* الشريط السفلي (يظهر فقط على الجوال) */}
      {showBottomNav && isMobile && (
        <BottomNavigation
          onOpenCart={() => setOpenCart(true)}
          onOpenFavorites={() => setOpenFavorites(true)}
        />
      )}

      {/* نافذة السلة */}
      <CartSheet open={openCart} onOpenChange={setOpenCart} />

      {/* نافذة المفضلة */}
      <FavoritesSheet open={openFavorites} onOpenChange={setOpenFavorites} />
    </div>
  );
};

export default MobileLayout;
