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
    <div className="w-screen h-screen flex flex-col bg-gray-50">
      {/* المحتوى الرئيسي يأخذ كل المساحة المتاحة */}
      <main
        className={`flex-grow w-full ${
          showBottomNav && isMobile ? "pb-20" : ""
        }`}
      >
        <div className="w-full h-full">{children}</div>
      </main>

      {/* شريط التنقل والشرائح الجانبية */}
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
