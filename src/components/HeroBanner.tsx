
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowDown } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative min-h-[300px] flex items-center overflow-hidden">
      {/* Background with blue and yellow gradient matching the logo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/15 via-transparent to-transparent"></div>
      
      {/* Animated background elements - fewer for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-12 left-6 opacity-20 text-3xl md:text-4xl float-animation">🍰</div>
        <div className="absolute top-20 right-8 opacity-15 text-2xl md:text-3xl float-animation" style={{animationDelay: '1s'}}>🧁</div>
        <div className="absolute bottom-12 left-12 opacity-20 text-3xl md:text-4xl float-animation" style={{animationDelay: '2s'}}>🍫</div>
        <div className="absolute bottom-20 right-6 opacity-15 text-2xl md:text-3xl float-animation" style={{animationDelay: '0.5s'}}>🍭</div>
        <div className="hidden md:block absolute top-32 left-1/2 opacity-15 text-3xl float-animation" style={{animationDelay: '1.5s'}}>🎂</div>
        <div className="hidden md:block absolute top-16 right-1/3 opacity-20 text-3xl float-animation" style={{animationDelay: '2.5s'}}>🍪</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-bounce-in flex items-center justify-center mb-3">
            <img 
              src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png" 
              alt="بلا حدود للحلويات" 
              className="h-12 w-12 md:h-16 md:w-16 mb-2"
            />
          </div>
          
          <div className="animate-bounce-in">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 leading-tight text-shadow font-arabic">
              بلا حدود
              <br />
              <span className="text-yellow-300 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                للحلويات
              </span>
            </h1>
            <p className="text-sm md:text-base text-yellow-200 font-bold mb-2">Unlimited Sweets</p>
          </div>
          
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xs md:text-sm mb-3 opacity-90 leading-relaxed font-arabic px-4">
              اكتشف عالماً من النكهات اللذيذة والحلويات الطازجة
              <br className="hidden md:block" />
              مع أجود أنواع الكيك والشوكولاته والمشروبات المنعشة
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 justify-center animate-slide-up px-4" style={{animationDelay: '0.6s'}}>
            <Button size="default" className="text-sm md:text-base px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-bold transition-all duration-300">
              <ShoppingBag className="ml-2 h-4 w-4" />
              تسوق الآن
            </Button>
            <Button size="default" variant="outline" className="text-sm md:text-base px-4 py-2 bg-white text-blue-800 hover:bg-blue-50 border-2 border-white transition-all duration-300">
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
