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
      <main className={`flex-1 ${showBottomNav && isMobile ? 'pb-20' : ''}`}>
        <div className="w-full px-0">
          {children}
        </div>
      </main>

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
