
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowDown } from "lucide-react";

const HeroBanner = () => {
  return (
    <section className="relative min-h-[500px] flex items-center overflow-hidden">
      {/* Background with blue and yellow gradient matching the logo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 via-transparent to-transparent"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 opacity-30 text-6xl float-animation">🍰</div>
        <div className="absolute top-40 right-20 opacity-25 text-4xl float-animation" style={{animationDelay: '1s'}}>🧁</div>
        <div className="absolute bottom-20 left-20 opacity-30 text-5xl float-animation" style={{animationDelay: '2s'}}>🍫</div>
        <div className="absolute bottom-40 right-10 opacity-25 text-4xl float-animation" style={{animationDelay: '0.5s'}}>🍭</div>
        <div className="absolute top-60 left-1/2 opacity-20 text-3xl float-animation" style={{animationDelay: '1.5s'}}>🎂</div>
        <div className="absolute top-32 right-1/3 opacity-25 text-4xl float-animation" style={{animationDelay: '2.5s'}}>🍪</div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="animate-bounce-in flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png" 
              alt="بلا حدود للحلويات" 
              className="h-24 w-24 mb-2"
            />
          </div>
          
          <div className="animate-bounce-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight text-shadow font-arabic">
              بلا حدود
              <br />
              <span className="text-yellow-300 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                للحلويات
              </span>
            </h1>
            <p className="text-lg md:text-xl text-yellow-200 font-bold mb-2">Unlimited Sweets</p>
          </div>
          
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <p className="text-lg md:text-xl mb-6 opacity-90 leading-relaxed font-arabic">
              اكتشف عالماً من النكهات اللذيذة والحلويات الطازجة
              <br />
              مع أجود أنواع الكيك والشوكولاته والمشروبات المنعشة
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Button size="lg" className="text-lg px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-bold transition-all duration-300">
              <ShoppingBag className="ml-2 h-5 w-5" />
              تسوق الآن
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white text-blue-800 hover:bg-blue-50 border-2 border-white transition-all duration-300">
              استكشف المنتجات
              <ArrowDown className="mr-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
