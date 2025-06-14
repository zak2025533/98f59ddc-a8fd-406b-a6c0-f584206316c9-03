
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

const SimpleHeroBanner = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-arabic mb-6">
          بلا حدود للحلويات
        </h1>
        <p className="text-xl md:text-2xl font-arabic mb-8 opacity-90">
          أفضل الحلويات الطازجة والمشروبات اللذيذة
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-arabic text-lg px-8 py-3">
            <ShoppingCart className="h-5 w-5 ml-2" />
            تسوق الآن
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 font-arabic text-lg px-8 py-3">
            <Heart className="h-5 w-5 ml-2" />
            المفضلة
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimpleHeroBanner;
