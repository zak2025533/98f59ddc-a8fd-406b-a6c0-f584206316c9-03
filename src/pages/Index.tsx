import { useRef, useState } from "react";
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHeader from "@/components/mobile/MobileHeader";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import AllCategories from "@/components/AllCategories"; // تم التعديل هنا
import SimpleFooter from "@/components/SimpleFooter";
import Navbar from "@/components/Navbar";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartSheet } from "@/components/CartSheet";
import { FavoritesSheet } from "@/components/FavoritesSheet";

const Index = () => {
  useVisitorTracking();
  const isMobile = useIsMobile();

  // تم تغيير اسم المرجع ليعبر عن الفئات
  const categoriesRef = useRef<HTMLDivElement>(null);

  const [openCart, setOpenCart] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);

  if (isMobile) {
    return (
      <>
        <MobileLayout showBottomNav={true}>
          <MobileHeader title="بلا حدود للحلويات" />
          <div className="space-y-0">
            {/* تمرير المرجع لتمرير الصفحة لقسم AllCategories */}
            <HeroBanner scrollToRef={categoriesRef} onOpenCart={() => setOpenCart(true)} />
            <AnnouncementBanner />
            <div ref={categoriesRef}>
              <AllCategories />
            </div>
          </div>
          <SimpleFooter />
        </MobileLayout>

        <CartSheet open={openCart} onOpenChange={setOpenCart} />
        <FavoritesSheet open={openFavorites} onOpenChange={setOpenFavorites} />
      </>
    );
  }

  // نسخة سطح المكتب
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="space-y-0">
        <HeroBanner scrollToRef={categoriesRef} />
        <AnnouncementBanner />
        <div ref={categoriesRef}>
          <AllCategories />
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Index;
