
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
        .limit(isMobile ? 4 : 8);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    toast({
      title: "تمت الإضافة للسلة",
      description: "تم إضافة المنتج إلى سلة التسوق بنجاح",
    });
  };

  const handleToggleFavorite = (productId: string) => {
    toggleFavorite(productId);
    const isNowFavorite = !isFavorite(productId);
    toast({
      title: isNowFavorite ? "تمت الإضافة للمفضلة" : "تمت الإزالة من المفضلة",
      description: isNowFavorite ? "تم إضافة المنتج للمفضلة" : "تم إزالة المنتج من المفضلة",
    });
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(isMobile ? 4 : 8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-40 rounded-lg mb-3"></div>
                <div className="bg-gray-200 h-3 rounded mb-2"></div>
                <div className="bg-gray-200 h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-3">
            <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 fill-yellow-500 ml-2" />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 font-arabic">
              المنتجات المميزة
            </h2>
            <Star className="h-5 w-5 md:h-6 md:w-6 text-yellow-500 fill-yellow-500 mr-2" />
          </div>
          <p className="text-sm md:text-base text-gray-600 font-arabic">
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
          <div className="text-center mt-6">
            <a
              href="/category"
              className="inline-flex items-center space-x-2 space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-arabic text-sm md:text-base shadow-lg"
            >
              <span>عرض جميع المنتجات</span>
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
