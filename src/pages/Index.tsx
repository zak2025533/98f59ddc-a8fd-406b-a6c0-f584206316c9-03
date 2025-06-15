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

  if (isMobile) {
    return (
      <MobileLayout>
        <MobileHeader title="بلا حدود للحلويات" />
        <div className="space-y-4">
          <HeroBanner />
          <AnnouncementBanner />
          <FeaturedProducts />
        </div>
        <SimpleFooter />
      </MobileLayout>
    );
  }

  // Desktop version (keep existing layout but remove SimpleCategorySection)
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroBanner />
      <AnnouncementBanner />
      <FeaturedProducts />
      <SimpleFooter />
    </div>
  );
};

export default Index;
