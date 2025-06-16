
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import SimpleCategorySection from "@/components/SimpleCategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import SimpleFooter from "@/components/SimpleFooter";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

const Index = () => {
  useVisitorTracking();

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
