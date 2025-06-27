
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileProductCard from '@/components/mobile/MobileProductCard';
import ProductCard from '@/components/category/ProductCard';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  in_stock: boolean;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, price, image_url, is_featured, in_stock')
        .eq('is_featured', true)
        .eq('in_stock', true) // Only show products that are in stock
        .limit(isMobile ? 6 : 8);

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
      
      setProducts(data || []);
      console.log('Featured products loaded:', data?.length || 0);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      toast({
        title: "خطأ في تحميل المنتجات",
        description: "حدث خطأ أثناء تحميل المنتجات المميزة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      console.log('Adding product to cart:', productId);
      await addToCart(productId);
      toast({
        title: "تمت الإضافة للسلة",
        description: "تم إضافة المنتج إلى سلة التسوق بنجاح",
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة المنتج إلى السلة",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async (productId: string) => {
    try {
      console.log('Toggling favorite for product:', productId);
      await toggleFavorite(productId);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث المفضلة",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <section className="bg-white py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {[...Array(isMobile ? 6 : 8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-32 md:h-40 rounded-lg mb-2"></div>
                <div className="bg-gray-200 h-3 rounded mb-1"></div>
                <div className="bg-gray-200 h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-2">
            <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 fill-yellow-500 ml-2" />
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 font-arabic">
              المنتجات المميزة
            </h2>
            <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 fill-yellow-500 mr-2" />
          </div>
          <p className="text-sm text-gray-600 font-arabic">
            اكتشف أفضل منتجاتنا الأكثر طلباً
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => 
            isMobile ? (
              <MobileProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            ) : (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite}
                onAddToCart={handleAddToCart}
                onToggleFavorite={handleToggleFavorite}
              />
            )
          )}
        </div>

        {/* View All Button */}
        {products.length > 0 && (
          <div className="text-center mt-4">
            <a
              href="/category"
              className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-arabic text-sm md:text-base shadow-lg"
            >
              <span>عرض جميع المنتجات</span>
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </div>
        )}

        {/* No products message */}
        {products.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-500 font-arabic">لا توجد منتجات مميزة متاحة حالياً</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
