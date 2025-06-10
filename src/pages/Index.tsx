
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner />
      <CategorySection />
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Index;
