import { useRef } from "react";
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHeader from "@/components/mobile/MobileHeader";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import SimpleFooter from "@/components/SimpleFooter";
import Navbar from "@/components/Navbar";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  useVisitorTracking();
  const isMobile = useIsMobile();
  const productsRef = useRef<HTMLDivElement>(null);

  if (isMobile) {
    return (
      <MobileLayout>
        <MobileHeader title="بلا حدود للحلويات" />
        <HeroBanner scrollToRef={productsRef} />
        <AnnouncementBanner />
        <div ref={productsRef}>
          <FeaturedProducts />
        </div>
        <SimpleFooter />
      </MobileLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroBanner scrollToRef={productsRef} />
      <AnnouncementBanner />
      <div ref={productsRef}>
        <FeaturedProducts />
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Index;
