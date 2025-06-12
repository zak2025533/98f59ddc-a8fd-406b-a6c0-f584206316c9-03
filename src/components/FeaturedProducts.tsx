
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  subcategory_id: string;
  category_id?: string;
  is_featured: boolean;
  in_stock: boolean;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, price, image_url, category_id, subcategory_id, is_featured, in_stock')
        .eq('is_featured', true)
        .eq('in_stock', true)
        .limit(8);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">جاري تحميل المنتجات المميزة...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-blue-800 mb-6 font-arabic">
            منتجاتنا المميزة
          </h2>
          <p className="text-xl text-blue-600 max-w-3xl mx-auto leading-relaxed font-arabic">
            اختر من بين أفضل منتجاتنا المصنوعة بعناية فائقة ومكونات طبيعية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product, index) => (
              <Card 
                key={product.id} 
                className="sweet-card-hover cursor-pointer group overflow-hidden border-0 shadow-xl bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-blue-800 group-hover:text-blue-600 transition-colors font-arabic">
                      {product.name}
                    </h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground mr-1">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-arabic line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-blue-800 font-arabic">{product.price}</span>
                      <span className="text-sm text-muted-foreground mr-1">ريال</span>
                    </div>
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-blue-800 font-arabic">
                      <ShoppingCart className="h-4 w-4 ml-1" />
                      أضف للسلة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-blue-600 font-arabic">لا توجد منتجات مميزة حالياً</p>
              <p className="text-muted-foreground mt-2 font-arabic">تحقق مرة أخرى قريباً</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 text-lg font-arabic"
          >
            عرض جميع المنتجات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
