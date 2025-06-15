
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Coffee, Cake } from "lucide-react";

const SimpleHeroBanner = () => {
  return (
    <section className="relative bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-600 py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-bounce">
          <Cake className="h-12 w-12 text-white" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse">
          <Coffee className="h-8 w-8 text-white" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-bounce delay-300">
          <Star className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Logo Section */}
        <div className="mb-6">
          <img 
            src="/lovable-uploads/3137a9c8-db0b-4846-86ad-d34a734e5f02.png" 
            alt="بلا حدود للحلويات" 
            className="h-24 w-24 mx-auto rounded-full shadow-xl border-4 border-white/30"
            style={{ 
              backgroundColor: 'transparent',
              mixBlendMode: 'multiply'
            }}
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-arabic leading-tight drop-shadow-lg">
          مرحباً بك في
          <span className="block text-amber-100">بلا حدود للحلويات</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-amber-50 mb-8 font-arabic leading-relaxed max-w-3xl mx-auto drop-shadow-md">
          اكتشف عالماً من الحلويات اللذيذة والمشروبات المنعشة المحضرة بأفضل المكونات
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-white text-amber-800 font-bold px-8 py-3 text-lg font-arabic border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
          >
            تصفح المنتجات
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white hover:bg-white hover:text-amber-600 px-8 py-3 text-lg font-arabic bg-transparent backdrop-blur-sm shadow-lg"
            onClick={() => window.location.href = '/about'}
          >
            من نحن
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SimpleHeroBanner;
