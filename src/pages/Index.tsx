import { useRef, useState, useEffect } from "react";
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHeader from "@/components/mobile/MobileHeader";
import HeroBanner from "@/components/HeroBanner";
import AnnouncementBanner from "@/components/AnnouncementBanner";
// import FeaturedProducts from "@/components/FeaturedProducts"; // لم نعد نحتاجها
import SimpleFooter from "@/components/SimpleFooter";
import Navbar from "@/components/Navbar";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartSheet } from "@/components/CartSheet"; 
import { FavoritesSheet } from "@/components/FavoritesSheet";

// نفترض هنا أن AllCategories بيانات أو نستدعي API لجلبها
const fetchAllCategories = async () => {
  // مثال لجلب بيانات من API أو جلب ثابت
  return [
    { id: 1, name: "الكيك" },
    { id: 2, name: "الشوكولاتة" },
    // المزيد ...
  ];
};

const Index = () => {
  useVisitorTracking();
  const isMobile = useIsMobile();
  const featuredRef = useRef<HTMLDivElement>(null);
  const [openCart, setOpenCart] = useState(false);
  const [openFavorites, setOpenFavorites] = useState(false);
  const [allCategories, setAllCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchAllCategories().then(setAllCategories);
  }, []);

  if (isMobile) {
    return (
      <>
        <MobileLayout showBottomNav={true}>
          <MobileHeader title="بلا حدود للحلويات" />
          <div className="space-y-0">
            <HeroBanner
              scrollToRef={featuredRef}
              onOpenCart={() => setOpenCart(true)}
              allCategories={allCategories}  // تمرير allCategories
            />
            <AnnouncementBanner />
            <div ref={featuredRef}>
              {/* بدل FeaturedProducts، نعرض allCategories */}
              <ul>
                {allCategories.map((cat) => (
                  <li key={cat.id} className="p-2 border-b">{cat.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <SimpleFooter />
        </MobileLayout>

        <CartSheet open={openCart} onOpenChange={setOpenCart} />
        <FavoritesSheet open={openFavorites} onOpenChange={setOpenFavorites} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="space-y-0">
        <HeroBanner scrollToRef={featuredRef} allCategories={allCategories} />
        <AnnouncementBanner />
        <div ref={featuredRef}>
          <ul>
            {allCategories.map((cat) => (
              <li key={cat.id} className="p-2 border-b">{cat.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
};

export default Index;
