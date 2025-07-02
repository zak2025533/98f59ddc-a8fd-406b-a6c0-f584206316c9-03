
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, ArrowRight } from "lucide-react";
import { useCart } from '@/hooks/cart/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import SimpleNavbar from '@/components/SimpleNavbar';
import SimpleFooter from '@/components/SimpleFooter';
import MobileLayout from '@/components/mobile/MobileLayout';
import MobileHeader from '@/components/mobile/MobileHeader';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import ProductRating from '@/components/ProductRating';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  in_stock: boolean;
}

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast({
        title: "خطأ في تحميل المنتج",
        description: "حدث خطأ أثناء تحميل تفاصيل المنتج",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product.id);
      toast({
        title: "تمت الإضافة للسلة",
        description: "تم إضافة المنتج إلى سلة التسوق بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إضافة المنتج إلى السلة",
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = async () => {
    if (!product) return;
    
    try {
      await toggleFavorite(product.id);
      toast({
        title: isFavorite(product.id) ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة",
        description: isFavorite(product.id) ? "تم إزالة المنتج من المفضلة" : "تم إضافة المنتج إلى المفضلة",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحديث المفضلة",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {isMobile ? (
          <MobileLayout>
            <MobileHeader title="تفاصيل المنتج" />
            <div className="animate-pulse p-4">
              <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </MobileLayout>
        ) : (
          <>
            <SimpleNavbar />
            <div className="animate-pulse p-8">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="h-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        {isMobile ? (
          <MobileLayout>
            <MobileHeader title="المنتج غير موجود" />
            <div className="p-4 text-center">
              <p className="text-gray-500 font-arabic">المنتج المطلوب غير موجود</p>
            </div>
          </MobileLayout>
        ) : (
          <>
            <SimpleNavbar />
            <div className="p-8 text-center">
              <p className="text-gray-500 font-arabic">المنتج المطلوب غير موجود</p>
            </div>
          </>
        )}
      </div>
    );
  }

  const ProductContent = () => (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {!isMobile && (
        <Button 
          variant="ghost" 
          onClick={() => window.history.back()}
          className="mb-4 font-arabic"
        >
          <ArrowRight className="h-4 w-4 ml-2" />
          العودة
        </Button>
      )}

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80"}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
          {product.is_featured && (
            <Badge className="absolute top-4 right-4 bg-yellow-500 text-yellow-900 font-arabic">
              <Star className="h-4 w-4 ml-1" />
              مميز
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-arabic mb-2">
              {product.name}
            </h1>
            <ProductRating productId={product.id} size="lg" />
          </div>

          <p className="text-gray-700 text-lg leading-relaxed font-arabic">
            {product.description}
          </p>

          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="text-3xl font-bold text-blue-800 font-arabic">
              {product.price.toLocaleString('ar-EG')}
            </span>
            <span className="text-lg text-gray-600">ريال يمني</span>
          </div>

          <div className="flex space-x-4 space-x-reverse">
            <Button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-arabic"
            >
              <ShoppingCart className="h-5 w-5 ml-2" />
              {product.in_stock ? 'أضف إلى السلة' : 'غير متوفر'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleToggleFavorite}
              className="font-arabic"
            >
              <Heart className={`h-5 w-5 ml-2 ${isFavorite(product.id) ? 'text-red-500 fill-red-500' : 'text-red-500'}`} />
              {isFavorite(product.id) ? 'إزالة من المفضلة' : 'أضف للمفضلة'}
            </Button>
          </div>

          {!product.in_stock && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-arabic">
                هذا المنتج غير متوفر حالياً. سيتم إشعارك عند توفره مرة أخرى.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsSection productId={product.id} productName={product.name} />
    </div>
  );

  if (isMobile) {
    return (
      <MobileLayout>
        <MobileHeader title={product.name} />
        <ProductContent />
        <SimpleFooter />
      </MobileLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleNavbar />
      <ProductContent />
      <SimpleFooter />
    </div>
  );
};

export default ProductDetails;
