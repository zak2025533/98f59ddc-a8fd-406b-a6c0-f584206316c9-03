import { useEffect, useRef, useState } from "react";
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHeader from "@/components/mobile/MobileHeader";
import PullToRefresh from "@/components/mobile/PullToRefresh";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import SimpleFooter from "@/components/SimpleFooter";
import Navbar from "@/components/Navbar";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  useVisitorTracking();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [refreshKey, setRefreshKey] = useState(0);
  const featuredRef = useRef<HTMLDivElement>(null);

  // ⬇️ تهيئة OneSignal
  useEffect(() => {
    if (typeof window !== "undefined" && "OneSignal" in window) {
      window.OneSignal = window.OneSignal || [];
      window.OneSignal.push(function () {
        window.OneSignal.init({
          appId: "3c3da35a-91f0-4526-95d7-9799a3407583",
          notifyButton: {
            enable: true,
          },
          allowLocalhostAsSecureOrigin: true,
        });
      });
    }
  }, []);

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshKey((prev) => prev + 1);
    toast({
      title: "تم التحديث",
      description: "تم تحديث المحتوى بنجاح",
    });
  };

  if (isMobile) {
    return (
      <MobileLayout showBottomNav={true}>
        <MobileHeader title="بلا حدود للحلويات" />
        <PullToRefresh onRefresh={handleRefresh}>
          <div className="space-y-0" key={refreshKey}>
            <HeroBanner scrollToRef={featuredRef} onOpenCart={() => {}} />
            <AnnouncementBanner />
            <div ref={featuredRef}>
              <FeaturedProducts />
            </div>
          </div>
        </PullToRefresh>
        <SimpleFooter />
      </MobileLayout>
    );
  }

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
