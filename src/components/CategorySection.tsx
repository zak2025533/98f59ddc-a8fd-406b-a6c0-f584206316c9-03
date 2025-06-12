
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
      <section className="py-16 px-4 bg-gradient-to-b from-sweet-cream to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse text-xl text-blue-600 font-arabic">جاري تحميل الأقسام...</div>
        </div>
      </section>
    );
  }

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
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Card 
                key={category.id} 
                className="sweet-card-hover cursor-pointer group overflow-hidden border-0 shadow-xl bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="h-40 relative">
                  <img
                    src={category.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300 z-10"></div>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors font-arabic">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-sm px-3 py-1 font-arabic">
                      {category.product_count} منتج
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed mb-4 font-arabic">
                    اكتشف مجموعة رائعة من المنتجات في هذا القسم
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
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-blue-600 font-arabic">لا توجد أقسام حالياً</p>
              <p className="text-muted-foreground mt-2 font-arabic">تحقق مرة أخرى قريباً</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
