
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleHeroBanner from "@/components/SimpleHeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import SimpleCategorySection from "@/components/SimpleCategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import SimpleFooter from "@/components/SimpleFooter";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

const Index = () => {
  useVisitorTracking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SimpleNavbar />
      <SimpleHeroBanner />
      <AnnouncementBanner />
      <SimpleCategorySection />
      <FeaturedProducts />
      <SimpleFooter />
    </div>
  );
};

export default Index;
