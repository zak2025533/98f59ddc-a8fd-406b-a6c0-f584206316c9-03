
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Award, Truck } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background with gradient */}
      <div className="absolute inset-0 sweet-gradient"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-20 text-6xl">🍰</div>
        <div className="absolute top-40 right-20 opacity-20 text-4xl">🧁</div>
        <div className="absolute bottom-20 left-20 opacity-20 text-5xl">🍫</div>
        <div className="absolute bottom-40 right-10 opacity-20 text-4xl">🍭</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            بلا حدود
            <br />
            <span className="text-yellow-200">للحلويات</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            اكتشف عالماً من النكهات اللذيذة والحلويات الطازجة
            <br />
            مع أجود أنواع الكيك والشوكولاته والمشروبات
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              <ShoppingBag className="ml-2 h-5 w-5" />
              تسوق الآن
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20">
              استكشف المنتجات
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 rounded-full p-4 mb-4">
                <Star className="h-8 w-8 text-yellow-200" />
              </div>
              <h3 className="text-lg font-semibold mb-2">جودة عالية</h3>
              <p className="text-white/80">مكونات طبيعية ونكهات أصيلة</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 rounded-full p-4 mb-4">
                <Truck className="h-8 w-8 text-yellow-200" />
              </div>
              <h3 className="text-lg font-semibold mb-2">توصيل سريع</h3>
              <p className="text-white/80">توصيل مجاني للطلبات فوق 100 ريال</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/20 rounded-full p-4 mb-4">
                <Award className="h-8 w-8 text-yellow-200" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ضمان الطعم</h3>
              <p className="text-white/80">إذا لم تعجبك، نسترد أموالك</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
