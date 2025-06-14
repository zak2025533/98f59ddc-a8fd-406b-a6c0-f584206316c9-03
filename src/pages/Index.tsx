
import { useEffect } from "react";
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

  // تسجيل Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

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
