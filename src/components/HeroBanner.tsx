import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowDown } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative min-h-screen sm:min-h-[500px] pt-[env(safe-area-inset-top)] flex items-center overflow-hidden">
      {/* خلفيات متدرجة */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/15 via-transparent to-transparent"></div>

      {/* رموز تعبيرية تطفو */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-6 opacity-20 text-4xl sm:text-5xl float-animation">🍰</div>
        <div className="absolute top-32 right-8 opacity-15 text-3xl sm:text-4xl float-animation" style={{ animationDelay: '1s' }}>🧁</div>
        <div className="absolute bottom-16 left-12 opacity-20 text-4xl sm:text-5xl float-animation" style={{ animationDelay: '2s' }}>🍫</div>
        <div className="absolute bottom-28 right-6 opacity-15 text-3xl sm:text-4xl float-animation" style={{ animationDelay: '0.5s' }}>🍭</div>
        <div className="hidden md:block absolute top-48 left-1/2 opacity-15 text-3xl float-animation" style={{ animationDelay: '1.5s' }}>🎂</div>
        <div className="hidden md:block absolute top-24 right-1/3 opacity-20 text-4xl float-animation" style={{ animationDelay: '2.5s' }}>🍪</div>
      </div>

      {/* محتوى البانر */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* الشعار */}
          <div className="animate-bounce-in flex items-center justify-center mb-4">
            <img
              src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png"
              alt="بلا حدود للحلويات"
              className="h-16 w-16 md:h-20 md:w-20 mb-2"
            />
          </div>

          {/* العنوان */}
          <div className="animate-bounce-in">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-snug text-shadow font-arabic">
              بلا حدود
              <br />
              <span className="text-yellow-300 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                للحلويات
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-yellow-200 font-bold mb-2">Unlimited Sweets</p>
          </div>

          {/* الوصف */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-xs sm:text-sm md:text-lg mb-4 opacity-90 leading-relaxed font-arabic px-4">
              اكتشف عالماً من النكهات اللذيذة والحلويات الطازجة
              <br className="hidden md:block" />
              مع أجود أنواع الكيك والشوكولاته والمشروبات المنعشة
            </p>
          </div>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center animate-slide-up px-4" style={{ animationDelay: '0.6s' }}>
            <Button
              size="lg"
              className="text-sm sm:text-base md:text-lg px-4 sm:px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-bold transition-all duration-300"
            >
              <ShoppingBag className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              تسوق الآن
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-sm sm:text-base md:text-lg px-4 sm:px-6 py-3 bg-white text-blue-800 hover:bg-blue-50 border-2 border-white transition-all duration-300"
            >
              استكشف المنتجات
              <ArrowDown className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
