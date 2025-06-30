import { useRef, useState } from "react";
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHeader from "@/components/mobile/MobileHeader";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import SimpleFooter from "@/components/SimpleFooter";
import Navbar from "@/components/Navbar";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartSheet } from "@/components/CartSheet"; // ✅ إضافة
import { FavoritesSheet } from "@/components/FavoritesSheet"; // ✅ إضافة

const Index = () => {
  useVisitorTracking();
  const isMobile = useIsMobile();

  const featuredRef = useRef<HTMLDivElement>(null);

  // ✅ حالتا فتح السلة والمفضلة
  const [openCart, setOpenCart] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);

  if (isMobile) {
    return (
      <>
        <MobileLayout showBottomNav={true}>
          <MobileHeader title="بلا حدود للحلويات" />
          <div className="space-y-0">
            <HeroBanner scrollToRef={featuredRef} onOpenCart={() => setOpenCart(true)} /> {/* ✅ تمرير onOpenCart */}
            <AnnouncementBanner />
            <div ref={featuredRef}>
              <FeaturedProducts />
            </div>
          </div>
          <SimpleFooter />
        </MobileLayout>

        {/* ✅ CartSheet و FavoritesSheet */}
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
        <HeroBanner scrollToRef={featuredRef} />
        <AnnouncementBanner />
        <div ref={featuredRef}>
          <FeaturedProducts />
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Index;
