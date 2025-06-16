
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHeader from "@/components/mobile/MobileHeader";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import SimpleFooter from "@/components/SimpleFooter";
import Navbar from "@/components/Navbar";
import { CartSheet } from "@/components/CartSheet";
import { FavoritesSheet } from "@/components/FavoritesSheet";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  useVisitorTracking();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileLayout>
        <MobileHeader title="بلا حدود للحلويات" />
        {/* Hidden Cart and Favorites triggers for mobile navigation */}
        <div className="hidden">
          <CartSheet />
          <FavoritesSheet />
        </div>
        <div className="space-y-0">
          <HeroBanner />
          <AnnouncementBanner />
          <FeaturedProducts />
        </div>
        <SimpleFooter />
      </MobileLayout>
    );
  }

  // Desktop version
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hidden Cart and Favorites triggers for desktop navigation */}
      <div className="hidden">
        <CartSheet />
        <FavoritesSheet />
      </div>
      <div className="space-y-0">
        <HeroBanner />
        <AnnouncementBanner />
        <FeaturedProducts />
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Index;
