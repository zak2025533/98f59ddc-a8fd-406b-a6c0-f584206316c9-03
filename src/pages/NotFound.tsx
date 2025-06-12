
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50">
      <div className="text-center max-w-lg mx-auto px-6">
        <div className="mb-8">
          <img 
            src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png" 
            alt="بلا حدود للحلويات" 
            className="w-24 h-24 mx-auto mb-6"
          />
          <h1 className="text-8xl font-bold text-blue-800 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-blue-700 mb-4 font-arabic">
            الصفحة غير موجودة
          </h2>
          <p className="text-xl text-blue-600 mb-8 leading-relaxed font-arabic">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 font-arabic">
            <Link to="/">
              <Home className="ml-2 h-5 w-5" />
              العودة للرئيسية
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="border-blue-600 text-blue-600 hover:bg-blue-50 font-arabic"
            onClick={() => window.history.back()}
          >
            <span className="cursor-pointer">
              <ArrowLeft className="ml-2 h-5 w-5" />
              الصفحة السابقة
            </span>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-lg border border-blue-100">
          <h3 className="text-lg font-bold text-blue-800 mb-3 font-arabic">
            هل تبحث عن شيء معين؟
          </h3>
          <div className="text-blue-600 space-y-2 font-arabic">
            <p>• تصفح مجموعتنا من الحلويات اللذيذة</p>
            <p>• اكتشف منتجاتنا المميزة</p>
            <p>• تواصل معنا للحصول على المساعدة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
