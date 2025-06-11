
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
  gradient: string;
  hoverGradient: string;
}

const categories: Category[] = [
  {
    id: "cakes",
    name: "كيكات",
    image: "🎂",
    description: "كيكات طازجة ولذيذة لجميع المناسبات الخاصة",
    productCount: 25,
    gradient: "from-pink-400 to-pink-600",
    hoverGradient: "from-pink-500 to-pink-700"
  },
  {
    id: "wafers-chocolate",
    name: "ويفرات وشوكولاته",
    image: "🍫",
    description: "مجموعة متنوعة من الويفرات والشوكولاته الفاخرة",
    productCount: 32,
    gradient: "from-amber-400 to-orange-600",
    hoverGradient: "from-amber-500 to-orange-700"
  },
  {
    id: "beverages",
    name: "مشروبات وعصائر",
    image: "🥤",
    description: "مشروبات منعشة وعصائر طبيعية طازجة",
    productCount: 18,
    gradient: "from-blue-400 to-cyan-600",
    hoverGradient: "from-blue-500 to-cyan-700"
  },
  {
    id: "sweets-candies",
    name: "حلوى ومليمات",
    image: "🍭",
    description: "حلويات تقليدية ومليمات شهية ولذيذة",
    productCount: 28,
    gradient: "from-purple-400 to-pink-600",
    hoverGradient: "from-purple-500 to-pink-700"
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-sweet-cream to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground mb-6 font-arabic">
            أقسامنا المميزة
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            اكتشف مجموعتنا الواسعة من الحلويات والمشروبات اللذيذة المحضرة بعناية فائقة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="sweet-card-hover cursor-pointer group overflow-hidden border-0 shadow-xl bg-white"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={`h-40 bg-gradient-to-br ${category.gradient} group-hover:bg-gradient-to-br group-hover:${category.hoverGradient} flex items-center justify-center transition-all duration-300 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {category.image}
                </span>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors font-arabic">
                    {category.name}
                  </h3>
                  <Badge variant="secondary" className="text-sm px-3 py-1 font-arabic">
                    {category.productCount} منتج
                  </Badge>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed mb-4 font-arabic">
                  {category.description}
                </p>
                <Button 
                  variant="ghost" 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 font-arabic"
                >
                  تصفح المنتجات
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
