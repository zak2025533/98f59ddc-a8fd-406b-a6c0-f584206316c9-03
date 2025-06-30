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

const Index = () => {
  useVisitorTracking();
  const isMobile = useIsMobile();

  const featuredRef = useRef<HTMLDivElement>(null);

  // حالات فتح السلة والمفضلة تمت إزالتها من هنا

  if (isMobile) {
    return (
      <MobileLayout showBottomNav={true}>
        <MobileHeader title="بلا حدود للحلويات" />
        <div className="space-y-0">
          <HeroBanner scrollToRef={featuredRef} onOpenCart={() => {}} /> {/* تمرير دالة فارغة أو تعديل حسب الحاجة */}
          <AnnouncementBanner />
          <div ref={featuredRef}>
            <FeaturedProducts />
          </div>
        </div>
        <SimpleFooter />
      </MobileLayout>
    );
  }

  // نسخة سطح المكتب
  return (
    <div className="min-h-[100vh] bg-[#2563eb] text-white">
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
