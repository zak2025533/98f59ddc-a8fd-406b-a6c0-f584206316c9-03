import { ReactNode } from "react";
import BottomNavigation from "./BottomNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartSheet } from "@/components/CartSheet";
import { FavoritesSheet } from "@/components/FavoritesSheet";

interface MobileLayoutProps {
  children: ReactNode;
  showBottomNav?: boolean;
  bgColor?: string;            // إضافة خاصية لتغيير خلفية الحاوية
  className?: string;          // إمكانية تمرير كلاس إضافي
}

const MobileLayout = ({
  children,
  showBottomNav = true,
  bgColor = "bg-gray-50",
  className = "",
}: MobileLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`min-h-screen flex flex-col w-full ${bgColor} ${className}`}>
      {/* المحتوى الرئيسي */}
      <main
        className={`flex-1 w-full transition-padding duration-300 ease-in-out ${
          showBottomNav && isMobile ? "pb-24 md:pb-28" : "pb-4"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4">{children}</div>
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
