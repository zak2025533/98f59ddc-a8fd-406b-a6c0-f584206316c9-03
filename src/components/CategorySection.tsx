
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  image_url: string;
  slug: string;
  product_count?: number;
}

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data: categoriesData, error } = await supabase
        .from('categories')
        .select('id, name, image_url, slug');

      if (error) throw error;

      // Get product count for each category
      const categoriesWithCount = await Promise.all(
        (categoriesData || []).map(async (category) => {
          const { count } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id);

          return {
            ...category,
            product_count: count || 0
          };
        })
      );

      setCategories(categoriesWithCount);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/category/${categorySlug}`);
  };

  if (loading) {
    return (
      <section className="py-8 sm:py-16 px-4 bg-gradient-to-b from-sweet-cream to-white" id="categories">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse text-xl text-blue-600 font-arabic">جاري تحميل الأقسام...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-16 px-4 bg-gradient-to-b from-sweet-cream to-white" id="categories">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 sm:mb-6 font-arabic">
            أقسامنا المميزة
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-arabic">
            اكتشف مجموعتنا الواسعة من الحلويات والمشروبات اللذيذة المحضرة بعناية فائقة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="sweet-card-hover cursor-pointer group overflow-hidden border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="h-32 sm:h-40 relative overflow-hidden">
                  <img
                    src={category.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-500"></div>
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-800 border-0 shadow-md font-arabic flex items-center gap-1"
                  >
                    <Package className="h-3 w-3" />
                    {category.product_count}
                  </Badge>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors font-arabic mb-2">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 font-arabic">
                    اكتشف مجموعة رائعة من المنتجات المميزة
                  </p>
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300 font-arabic justify-between"
                  >
                    تصفح المنتجات
                    <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Package className="h-16 w-16 mx-auto text-blue-300 mb-4" />
              <p className="text-xl text-blue-600 font-arabic mb-2">لا توجد أقسام حالياً</p>
              <p className="text-muted-foreground font-arabic">تحقق مرة أخرى قريباً</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
