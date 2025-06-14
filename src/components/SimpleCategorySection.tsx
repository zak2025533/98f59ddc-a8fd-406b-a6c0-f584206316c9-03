
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const SimpleCategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "الحلويات الشرقية",
      image: "/placeholder.svg",
      color: "bg-red-100 hover:bg-red-200"
    },
    {
      id: 2,
      name: "الحلويات الغربية",
      image: "/placeholder.svg",
      color: "bg-blue-100 hover:bg-blue-200"
    },
    {
      id: 3,
      name: "المشروبات",
      image: "/placeholder.svg",
      color: "bg-green-100 hover:bg-green-200"
    },
    {
      id: 4,
      name: "الكيك والتورتات",
      image: "/placeholder.svg",
      color: "bg-purple-100 hover:bg-purple-200"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-arabic text-gray-800 mb-4">
            فئات المنتجات
          </h2>
          <p className="text-lg font-arabic text-gray-600">
            اختر من مجموعة متنوعة من الحلويات والمشروبات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className={`${category.color} border-2 border-gray-200 transition-all duration-300 hover:shadow-lg cursor-pointer`}>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold font-arabic text-gray-800 mb-3">
                  {category.name}
                </h3>
                <Button variant="outline" size="sm" className="font-arabic">
                  تصفح المنتجات
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleCategorySection;
