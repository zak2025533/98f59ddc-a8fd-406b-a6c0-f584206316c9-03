
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHeader from "@/components/mobile/MobileHeader";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import SimpleCategorySection from "@/components/SimpleCategorySection";
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
          <SimpleCategorySection />
          <FeaturedProducts />
        </div>
        <SimpleFooter />
      </MobileLayout>
    );
  }

  // Desktop version (keep existing layout)
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <HeroBanner />
      <AnnouncementBanner />
      <SimpleCategorySection />
      <FeaturedProducts />
      <SimpleFooter />
    </div>
  );
};

export default Index;
