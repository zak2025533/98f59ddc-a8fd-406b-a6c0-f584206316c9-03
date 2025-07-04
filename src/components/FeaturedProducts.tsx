
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, ArrowLeft } from 'lucide-react';
import { useCart } from '@/hooks/cart/useCart';
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
        .eq('in_stock', true)
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
      <section className="bg-gradient-to-br from-gray-50 to-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse mr-2"></div>
              <div className="w-40 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse ml-2"></div>
            </div>
            <div className="w-60 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(isMobile ? 6 : 8)].map((_, i) => (
              <div key={i} className="modern-card animate-pulse">
                <div className="bg-gray-200 h-44 rounded-t-2xl"></div>
                <div className="p-4 space-y-3">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-3 rounded w-full"></div>
                  <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                  <div className="flex justify-between items-center">
                    <div className="bg-gray-200 h-5 rounded w-16"></div>
                    <div className="bg-gray-200 h-8 rounded-lg w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8 fade-in-up">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 rounded-full shadow-lg">
              <Star className="h-6 w-6 text-yellow-900 fill-yellow-900 animate-pulse" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-900 font-arabic">
                المنتجات المميزة
              </h2>
              <Star className="h-6 w-6 text-yellow-900 fill-yellow-900 animate-pulse" />
            </div>
          </div>
          <p className="text-base text-gray-600 font-arabic max-w-md mx-auto leading-relaxed">
            اكتشف أفضل منتجاتنا الأكثر طلباً والأعلى تقييماً
          </p>
        </div>

        {/* Enhanced Products Grid */}
        <div className="grid gap-4 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => 
            <div key={product.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              {isMobile ? (
                <MobileProductCard product={product} />
              ) : (
                <ProductCard
                  product={product}
                  isFavorite={isFavorite}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}
            </div>
          )}
        </div>

        {/* Enhanced View All Button */}
        {products.length > 0 && (
          <div className="text-center mt-8 fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="/category"
              className="modern-button inline-flex items-center space-x-3 space-x-reverse bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 font-arabic text-lg border border-blue-400/50"
            >
              <span>عرض جميع المنتجات</span>
              <ArrowLeft className="h-5 w-5" />
            </a>
          </div>
        )}

        {/* Enhanced No products message */}
        {products.length === 0 && !loading && (
          <div className="text-center py-12 fade-in-up">
            <div className="bg-gray-100 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4">🍰</div>
              <p className="text-gray-600 font-arabic text-lg">لا توجد منتجات مميزة متاحة حالياً</p>
              <p className="text-gray-500 font-arabic text-sm mt-2">تابعونا للحصول على أحدث المنتجات</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
