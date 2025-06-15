
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/hooks/cart/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import ProductReviews from '@/components/reviews/ProductReviews';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  in_stock: boolean;
  categories?: {
    name: string;
  };
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            name
          )
        `)
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        navigate('/');
        return;
      }

      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id);
      toast({
        title: "تم إضافة المنتج",
        description: `تم إضافة ${product.name} إلى السلة`,
      });
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 font-arabic mb-4">
            المنتج غير موجود
          </h1>
          <Button onClick={() => navigate('/')} className="font-arabic">
            العودة للصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-6 font-arabic"
        >
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                {product.is_featured && (
                  <Badge className="bg-yellow-500 text-yellow-900 font-arabic">
                    <Star className="h-3 w-3 ml-1" />
                    مميز
                  </Badge>
                )}
                {product.categories && (
                  <Badge variant="outline" className="font-arabic">
                    {product.categories.name}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-blue-800 mb-4 font-arabic">
                {product.name}
              </h1>

              <p className="text-gray-700 text-lg leading-relaxed mb-6 font-arabic">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <span className="text-4xl font-bold text-blue-800 font-arabic">
                    {product.price}
                  </span>
                  <span className="text-lg text-gray-600 mr-2">ريال يمني</span>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleToggleFavorite}
                    className="font-arabic"
                  >
                    <Heart className={`h-5 w-5 ml-2 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-red-500'}`} />
                    {isFavorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                  </Button>
                  
                  <Button
                    size="lg"
                    onClick={handleAddToCart}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-arabic"
                    disabled={!product.in_stock}
                  >
                    <ShoppingCart className="h-5 w-5 ml-2" />
                    {product.in_stock ? 'أضف للسلة' : 'غير متوفر'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80"}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>

        <ProductReviews 
          productId={product.id} 
          productName={product.name}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
