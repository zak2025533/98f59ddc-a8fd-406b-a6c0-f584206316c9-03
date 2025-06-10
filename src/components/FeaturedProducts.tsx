
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

const featuredProducts: Product[] = [
  {
    id: "1",
    name: "كيكة الشوكولاته الفاخرة",
    price: 85,
    originalPrice: 120,
    rating: 4.8,
    image: "🍰",
    category: "كيكات",
    isOnSale: true
  },
  {
    id: "2",
    name: "شوكولاته بلجيكية مميزة",
    price: 45,
    rating: 4.9,
    image: "🍫",
    category: "شوكولاته",
    isNew: true
  },
  {
    id: "3",
    name: "عصير المانجو الطبيعي",
    price: 25,
    rating: 4.7,
    image: "🥭",
    category: "مشروبات"
  },
  {
    id: "4",
    name: "حلوى اللوز التقليدية",
    price: 35,
    rating: 4.6,
    image: "🍯",
    category: "حلوى"
  },
  {
    id: "5",
    name: "ويفر بالكراميل",
    price: 28,
    originalPrice: 35,
    rating: 4.5,
    image: "🧇",
    category: "ويفرات",
    isOnSale: true
  },
  {
    id: "6",
    name: "كب كيك الفراولة",
    price: 15,
    rating: 4.4,
    image: "🧁",
    category: "كيكات",
    isNew: true
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            المنتجات المميزة
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف أشهى منتجاتنا المختارة بعناية خاصة لك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="sweet-card-hover group border-0 shadow-lg overflow-hidden">
              <div className="relative">
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-sweet-cream to-white flex items-center justify-center">
                  <span className="text-8xl">{product.image}</span>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white">جديد</Badge>
                  )}
                  {product.isOnSale && (
                    <Badge className="bg-red-500 text-white">عرض</Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="absolute top-3 left-3 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground mr-1">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {product.price} ر.س
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice} ر.س
                      </span>
                    )}
                  </div>
                  <Button size="sm" className="gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    إضافة
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            عرض جميع المنتجات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
