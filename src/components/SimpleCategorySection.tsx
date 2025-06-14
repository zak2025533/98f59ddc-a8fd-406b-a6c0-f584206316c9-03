
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

const SimpleCategorySection = () => {
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
      <section className="py-16 px-4 bg-white" id="categories">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse text-xl text-blue-600 font-arabic">جاري تحميل الأقسام...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white" id="categories">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 mb-4 font-arabic">
            أقسامنا المميزة
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-arabic">
            اكتشف مجموعتنا الواسعة من الحلويات والمشروبات اللذيذة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Card 
                key={category.id} 
                className="cursor-pointer group overflow-hidden border-2 border-blue-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl bg-white"
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={category.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-white/90 text-blue-800 font-arabic flex items-center gap-1"
                  >
                    <Package className="h-3 w-3" />
                    {category.product_count}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-800 group-hover:text-purple-600 transition-colors font-arabic mb-3">
                    {category.name}
                  </h3>
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-blue-50 transition-all duration-300 font-arabic"
                  >
                    تصفح المنتجات
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Package className="h-16 w-16 mx-auto text-blue-300 mb-4" />
              <p className="text-xl text-blue-600 font-arabic">لا توجد أقسام حالياً</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SimpleCategorySection;
