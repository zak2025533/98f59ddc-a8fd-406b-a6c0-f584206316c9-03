
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner />
      <AnnouncementBanner />
      <CategorySection />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Index;
