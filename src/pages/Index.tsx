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

  const featuredRef = useRef<HTMLDivElement>(null);

  if (isMobile) {
    return (
      <MobileLayout showBottomNav={true}>
        <MobileHeader title="بلا حدود للحلويات" />
        <div className="space-y-0">
          <HeroBanner scrollToRef={featuredRef} onOpenCart={() => {}} />
          <AnnouncementBanner />
          <div ref={featuredRef}>
            <FeaturedProducts />
          </div>
        </div>
        <SimpleFooter />
      </MobileLayout>
    );
  }

  // نسخة سطح المكتب مع الخلفية الجديدة
  return (
    <div className="min-h-screen bg-[#3b2fa0] text-white">
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
