
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import AppDownloadSection from "@/components/AppDownloadSection";
import MedianAppBanner from "@/components/MedianAppBanner";
import Footer from "@/components/Footer";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

const Index = () => {
  // تتبع الزوار تلقائياً عند تحميل الصفحة الرئيسية
  useVisitorTracking();

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner />
      <AnnouncementBanner />
      <CategorySection />
      <FeaturedProducts />
      <AppDownloadSection />
      <Footer />
      <MedianAppBanner />
    </div>
  );
};

export default Index;
