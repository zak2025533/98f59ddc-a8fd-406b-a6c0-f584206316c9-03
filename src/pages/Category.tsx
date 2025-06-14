
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const Category = () => {
  const categories = [
    { name: "الحلويات الشرقية", description: "بقلاوة، كنافة، معمول", color: "bg-red-50 border-red-200" },
    { name: "الحلويات الغربية", description: "كوكيز، دونات، مافن", color: "bg-blue-50 border-blue-200" },
    { name: "المشروبات", description: "عصائر طازجة، قهوة، شاي", color: "bg-green-50 border-green-200" },
    { name: "الكيك والتورتات", description: "كيك عيد ميلاد، تورتات مخصصة", color: "bg-purple-50 border-purple-200" },
    { name: "الآيس كريم", description: "آيس كريم بنكهات متنوعة", color: "bg-yellow-50 border-yellow-200" },
    { name: "الشوكولاتة", description: "شوكولاتة فاخرة وهدايا", color: "bg-pink-50 border-pink-200" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-arabic text-gray-800 mb-4">
              فئات المنتجات
            </h1>
            <p className="text-lg font-arabic text-gray-600">
              اختر الفئة المناسبة لتصفح منتجاتنا المتنوعة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className={`${category.color} border-2 hover:shadow-lg transition-all duration-300 cursor-pointer`}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold font-arabic text-gray-800 mb-3">
                    {category.name}
                  </h3>
                  <p className="font-arabic text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <Button className="font-arabic bg-blue-600 hover:bg-blue-700">
                    تصفح المنتجات
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <SimpleFooter />
    </div>
  );
};

export default Category;
