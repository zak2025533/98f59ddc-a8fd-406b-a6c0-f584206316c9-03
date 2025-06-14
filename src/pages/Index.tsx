
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

const Index = () => {
  // تتبع الزوار تلقائياً عند تحميل الصفحة الرئيسية
  useVisitorTracking();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
