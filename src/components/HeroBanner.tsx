import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { RefObject } from "react";

interface HeroBannerProps {
  scrollToRef?: RefObject<HTMLDivElement>;
  onOpenCart?: () => void;
}

const HeroBanner = ({ scrollToRef, onOpenCart }: HeroBannerProps) => {
  const isMobile = useIsMobile();

  const handleScroll = () => {
    scrollToRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
      {/* الخلفية المحدثة */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-blue-800"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>

      {/* الزينة المحدثة */}
      <div className="absolute inset-0 overflow-hidden">
        {['🍰', '🧁', '🍫', '🍭', '🎂', '🍪', '🍩', '🧁'].map((emoji, index) => (
          <div 
            key={index}
            className={`absolute opacity-20 text-4xl md:text-6xl animate-float ${
              index % 2 === 0 ? 'animation-delay-1000' : 'animation-delay-2000'
            }`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* المحتوى المحدث */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center text-white z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo with enhanced styling */}
          <div className="scale-in flex items-center justify-center mb-6">
            <div className="relative">
              <img
                src="/lovable-uploads/420dd569-71cd-4e6b-9d6a-946abecbc0e9.png"
                alt="بلا حدود للحلويات"
                className="h-20 w-20 md:h-24 md:w-24 rounded-full shadow-2xl ring-4 ring-white/30"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400/30 to-transparent animate-pulse"></div>
            </div>
          </div>

          {/* Enhanced title */}
          <div className="fade-in-up mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-arabic">
              <span className="block text-white drop-shadow-lg">بلا حدود</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl font-extrabold">
                للحلويات
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 font-medium mt-3 tracking-wide">Unlimited Sweets</p>
          </div>

          {/* Enhanced description */}
          <div className="fade-in-up mb-8" style={{ animationDelay: '0.3s' }}>
            <p className="text-base md:text-xl text-blue-50 leading-relaxed font-arabic max-w-2xl mx-auto">
              🌟 اكتشف عالماً من النكهات اللذيذة والحلويات الطازجة
              <br className="hidden md:block" />
              مع أجود أنواع الكيك والشوكولاته والمشروبات المنعشة 🧁
            </p>
          </div>

          {/* Enhanced action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up px-4" style={{ animationDelay: '0.6s' }}>
            <Button
              size="lg"
              className="modern-button text-lg px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 font-bold shadow-xl hover:shadow-2xl border border-yellow-300/50 rounded-2xl"
              onClick={onOpenCart}
            >
              <ShoppingBag className="ml-2 h-5 w-5" />
              🛍️ تسوق الآن
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="modern-button text-lg px-8 py-4 glass-card text-white hover:bg-white/20 border-2 border-white/50 rounded-2xl backdrop-blur-sm font-arabic font-bold"
              onClick={handleScroll}
            >
              🎯 استكشف المنتجات
              <ArrowDown className="mr-2 h-5 w-5" />
            </Button>
          </div>

          {/* Floating elements */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 opacity-30 animate-bounce hidden lg:block">
            <div className="text-6xl">✨</div>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-30 animate-bounce hidden lg:block" style={{ animationDelay: '1s' }}>
            <div className="text-6xl">⭐</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
