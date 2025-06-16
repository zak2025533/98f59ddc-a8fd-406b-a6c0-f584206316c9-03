
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, ShoppingCart, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="shadow-2xl border-blue-200 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="mx-auto mb-6">
              <img
                src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png"
                alt="بلا حدود للحلويات"
                className="h-20 w-20 mx-auto rounded-full shadow-lg"
              />
            </div>
            <CardTitle className="text-6xl font-bold text-blue-800 mb-4">
              404
            </CardTitle>
            <h1 className="text-2xl font-bold text-gray-800 font-arabic mb-2">
              الصفحة غير موجودة
            </h1>
            <p className="text-gray-600 font-arabic">
              عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها إلى مكان آخر
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/">
                <Button className="w-full font-arabic bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Home className="h-4 w-4 ml-2" />
                  العودة للرئيسية
                </Button>
              </Link>
              
              <Link to="/#categories">
                <Button variant="outline" className="w-full font-arabic hover:bg-blue-50">
                  <ShoppingCart className="h-4 w-4 ml-2" />
                  تصفح المنتجات
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2 font-arabic">
                هل تحتاج مساعدة؟
              </h3>
              <p className="text-sm text-blue-700 font-arabic mb-3">
                يمكنك العثور على ما تبحث عنه من خلال:
              </p>
              <ul className="text-sm text-blue-700 space-y-1 font-arabic">
                <li>• تصفح أقسام المنتجات المختلفة</li>
                <li>• استخدام خاصية البحث</li>
                <li>• التواصل مع خدمة العملاء</li>
              </ul>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link to="/contact" className="flex-1">
                <Button variant="ghost" className="w-full font-arabic text-gray-600 hover:text-blue-600">
                  تواصل معنا
                </Button>
              </Link>
              
              <Link to="/about" className="flex-1">
                <Button variant="ghost" className="w-full font-arabic text-gray-600 hover:text-blue-600">
                  من نحن
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Previous Page */}
        <div className="mt-6">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="font-arabic text-gray-500 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة للصفحة السابقة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
