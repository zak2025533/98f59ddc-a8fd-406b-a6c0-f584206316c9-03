import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, Award, Truck, ArrowDown } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-transparent z-0"></div>
      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="hidden md:block absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 left-10 opacity-30 text-6xl float-animation">🍰</div>
        <div className="absolute top-40 right-20 opacity-25 text-4xl float-animation" style={{ animationDelay: '1s' }}>🧁</div>
        <div className="absolute bottom-20 left-20 opacity-30 text-5xl float-animation" style={{ animationDelay: '2s' }}>🍫</div>
        <div className="absolute bottom-40 right-10 opacity-25 text-4xl float-animation" style={{ animationDelay: '0.5s' }}>🍭</div>
        <div className="absolute top-60 left-1/2 opacity-20 text-3xl float-animation" style={{ animationDelay: '1.5s' }}>🎂</div>
        <div className="absolute top-32 right-1/3 opacity-25 text-4xl float-animation" style={{ animationDelay: '2.5s' }}>🍪</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        <div className="max-w-4xl mx-auto">
          <div className="animate-bounce-in flex items-center justify-center mb-8">
            <img
              src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png"
              alt="بلا حدود للحلويات"
              className="h-32 w-32 mb-4"
            />
          </div>

          <div className="animate-bounce-in">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight text-shadow font-arabic">
              متجر بلا حدود
              <br />
              <span className="text-yellow-300 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                للحلويات
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-yellow-200 font-bold mb-2">Unlimited Sweets</p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed font-arabic">
              اكتشف عالماً من النكهات اللذيذة والحلويات الطازجة
              <br />
              مع أجود أنواع الكيك والشوكولاته والمشروبات المنعشة
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button
              size="lg"
              aria-label="تسوق الآن"
              className="text-lg px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-bold transition-all duration-300"
            >
              <ShoppingBag className="ml-2 h-5 w-5" />
              تسوق الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              aria-label="استكشاف المنتجات"
              className="text-lg px-8 py-4 bg-white text-blue-800 hover:bg-blue-50 border-2 border-white transition-all duration-300"
            >
              استكشف المنتجات
              <ArrowDown className="mr-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up" style={{ animationDelay: '0.9s' }}>
            <div className="flex flex-col items-center text-center group">
              <div className="glass-effect rounded-full p-6 mb-4 group-hover:scale-110 transition-transform duration-300 bg-white/10">
                <Star className="h-10 w-10 text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-arabic">جودة عالية</h3>
              <p className="text-white/80 leading-relaxed">مكونات طبيعية ونكهات أصيلة من أفضل المصادر</p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="glass-effect rounded-full p-6 mb-4 group-hover:scale-110 transition-transform duration-300 bg-white/10">
                <Truck className="h-10 w-10 text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-arabic">توصيل سريع</h3>
              <p className="text-white/80 leading-relaxed">توصيل مجاني للطلبات فوق 100 الف  </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="glass-effect rounded-full p-6 mb-4 group-hover:scale-110 transition-transform duration-300 bg-white/10">
                <Award className="h-10 w-10 text-yellow-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-arabic">ضمان الطعم</h3>
              <p className="text-white/80 leading-relaxed">إذا لم تعجبك منتجاتنا، نسترد أموالك كاملة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
