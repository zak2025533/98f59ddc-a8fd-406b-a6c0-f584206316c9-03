import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartSheet } from "@/components/CartSheet";
import { FavoritesSheet } from "@/components/FavoritesSheet"; // ✅

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
}

const MobileLayout = ({ children, showBottomNav = true }: MobileLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main content with bottom padding on mobile to accommodate bottom nav */}
      <main className={`flex-1 ${showBottomNav && isMobile ? 'pb-20' : ''}`}>
        {children}
      </main>

      {/* ✅ كلا من السلة والمفضلة يجب أن تكون هنا دائمًا */}
      {showBottomNav && isMobile && (
        <>
          <CartSheet />
          <FavoritesSheet /> {/* ✅ تمت الإضافة */}
          <BottomNavigation />
        </>
      )}
    </div>
  );
};

export default MobileLayout;
