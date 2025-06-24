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
      {/* ✅ المحتوى الرئيسي مع عرض مضبوط */}
      <main className={`flex-1 ${showBottomNav && isMobile ? 'pb-20' : ''}`}>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
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
