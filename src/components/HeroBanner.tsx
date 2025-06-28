import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroBanner = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative min-h-[400px] flex items-center overflow-hidden">
      {/* خلفية متدرجة */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/15 via-transparent to-transparent" />

      {/* عناصر خلفية متحركة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-6 opacity-20 text-3xl md:text-5xl float-animation">🍰</div>
        <div className="absolute top-32 right-8 opacity-15 text-2xl md:text-4xl float-animation" style={{ animationDelay: '1s' }}>🧁</div>
        <div className="absolute bottom-16 left-12 opacity-20 text-3xl md:text-5xl float-animation" style={{ animationDelay: '2s' }}>🍫</div>
        <div className="absolute bottom-28 right-6 opacity-15 text-2xl md:text-4xl float-animation" style={{ animationDelay: '0.5s' }}>🍭</div>
        <div className="hidden md:block absolute top-48 left-1/2 opacity-15 text-3xl float-animation" style={{ animationDelay: '1.5s' }}>🎂</div>
        <div className="hidden md:block absolute top-24 right-1/3 opacity-20 text-4xl float-animation" style={{ animationDelay: '2.5s' }}>🍪</div>
      </div>

      <div className="relative w-full text-center text-white px-4">
        <div className="max-w-xl mx-auto">

          {/* شعار وعنوان - يظهر فقط في غير الجوال */}
          {!isMobile && (
            <>
              <div className="animate-bounce-in flex justify-center mb-4">
                <img
                  src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png"
                  alt="بلا حدود للحلويات"
                  className="h-16 w-16 md:h-20 md:w-20 mb-2"
                />
              </div>
              <div className="animate-bounce-in mb-2">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-shadow font-arabic">
                  بلا حدود
                  <br />
                  <span className="text-yellow-300 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                    للحلويات
                  </span>
                </h1>
                <p className="text-base md:text-lg text-yellow-200 font-bold mt-1">Unlimited Sweets</p>
              </div>
            </>
          )}

          {/* الوصف المختصر */}
          <p className="animate-slide-up text-sm md:text-lg mb-4 leading-relaxed font-arabic">
            اكتشف عالماً من النكهات اللذيذة والحلويات الطازجة
            <br className="hidden md:block" />
            مع أجود أنواع الكيك والشوكولاتة والمشروبات المنعشة
          </p>

          {/* الأزرار */}
          <div className="animate-slide-up flex flex-col sm:flex-row gap-2 justify-center px-2">
            <Button size="lg" className="text-sm md:text-lg px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-bold">
              <ShoppingBag className="ml-2 h-4 w-4" />
              تسوق الآن
            </Button>
            <Button size="lg" variant="outline" className="text-sm md:text-lg px-5 py-2 bg-white text-blue-800 hover:bg-blue-50 border-2 border-white">
              استكشف المنتجات
              <ArrowDown className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
