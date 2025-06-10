
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  productCount: number;
  gradient: string;
}

const categories: Category[] = [
  {
    id: "cakes",
    name: "كيكات",
    image: "🎂",
    description: "كيكات طازجة ولذيذة لجميع المناسبات",
    productCount: 25,
    gradient: "from-pink-400 to-pink-600"
  },
  {
    id: "wafers-chocolate",
    name: "ويفرات وشوكولاته",
    image: "🍫",
    description: "مجموعة متنوعة من الويفرات والشوكولاته الفاخرة",
    productCount: 32,
    gradient: "from-amber-400 to-orange-600"
  },
  {
    id: "beverages",
    name: "مشروبات وعصائر",
    image: "🥤",
    description: "مشروبات منعشة وعصائر طبيعية",
    productCount: 18,
    gradient: "from-blue-400 to-cyan-600"
  },
  {
    id: "sweets-candies",
    name: "حلوى ومليمات",
    image: "🍭",
    description: "حلويات تقليدية ومليمات شهية",
    productCount: 28,
    gradient: "from-purple-400 to-pink-600"
  }
];

const CategorySection = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            أقسامنا المميزة
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف مجموعتنا الواسعة من الحلويات والمشروبات اللذيذة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="sweet-card-hover cursor-pointer group overflow-hidden border-0 shadow-lg"
            >
              <div className={`h-32 bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                <span className="text-6xl">{category.image}</span>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {category.productCount} منتج
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
