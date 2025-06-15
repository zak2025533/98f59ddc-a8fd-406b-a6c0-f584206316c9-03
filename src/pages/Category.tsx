import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  in_stock: boolean;
}

interface Category {
  id: string;
  name: string;
  image_url: string;
}

const Category = () => {
  const { categorySlug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    if (categorySlug) {
      fetchCategoryAndProducts();
    }
  }, [categorySlug]);

  const fetchCategoryAndProducts = async () => {
    try {
      // Fetch category info
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id, name, image_url')
        .eq('slug', categorySlug)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);

      // Fetch products in this category
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('id, name, description, price, image_url, is_featured, in_stock')
        .eq('category_id', categoryData.id)
        .eq('in_stock', true);

      if (productsError) throw productsError;
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = (productId: string) => {
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <SimpleNavbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-pulse text-xl text-blue-600 font-arabic">جاري التحميل...</div>
        </div>
        <SimpleFooter />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <SimpleNavbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600 font-arabic">القسم غير موجود</h1>
          <Button onClick={() => window.history.back()} className="mt-4 font-arabic bg-blue-600 hover:bg-blue-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة
          </Button>
        </div>
        <SimpleFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SimpleNavbar />
      
      {/* Category Header */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="mb-6 font-arabic bg-transparent text-white border-white/50 hover:bg-white/20 hover:text-white"
          >
            <ArrowLeft className="ml-2 h-4 w-4" />
            العودة للرئيسية
          </Button>
          <h1 className="text-5xl font-bold mb-4 font-arabic">{category.name}</h1>
          <p className="text-xl opacity-90 font-arabic">اكتشف أفضل المنتجات في هذا القسم</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <Card key={product.id} className="hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden border-2 border-blue-200 bg-white">
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      {product.is_featured && (
                        <Badge className="bg-yellow-500 text-yellow-900 font-arabic">
                          <Star className="h-3 w-3 ml-1" />
                          مميز
                        </Badge>
                      )}
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                        onClick={() => handleFavoriteClick(product.id)}
                      >
                        <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'text-red-500 fill-red-500' : 'text-red-500'}`} />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-blue-800 group-hover:text-purple-600 transition-colors font-arabic">
                        {product.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 mr-1">4.8</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 font-arabic line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-blue-800 font-arabic">{product.price}</span>
                        <span className="text-sm text-gray-600 mr-1">ريال يمني</span>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-arabic"
                        onClick={() => addToCart(product.id)}
                      >
                        <ShoppingCart className="h-4 w-4 ml-1" />
                        أضف للسلة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-blue-800 mb-4 font-arabic">لا توجد منتجات</h2>
              <p className="text-gray-600 font-arabic">لا توجد منتجات متاحة في هذا القسم حالياً</p>
            </div>
          )}
        </div>
      </section>

      <SimpleFooter />
    </div>
  );
};

export default Category;
