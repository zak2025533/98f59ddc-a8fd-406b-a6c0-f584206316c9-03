import { ReactNode } from "react";
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ محتوى بعرض كامل بدون حواف جانبية */}
      <main className={`flex-1 w-full ${showBottomNav && isMobile ? 'pb-20' : ''}`}>
        {children}
      </main>

      {/* ✅ مكونات التنقل السفلي والشرائح الجانبية */}
      {showBottomNav && isMobile && (
        <>
          <CartSheet />
          <FavoritesSheet />
          <BottomNavigation />
        </>
      )}
    </div>
  );
};

export default MobileLayout;
