
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/cart/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/use-toast";
import ProductRating from "@/components/ProductRating";
import React from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  in_stock: boolean;
}

interface MobileProductCardProps {
  product: Product;
}

const MobileProductCard = ({ product }: MobileProductCardProps) => {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { toast } = useToast();

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(product.id);
    toast({
      title: isFavorite(product.id) ? "تمت الإزالة من المفضلة" : "تمت الإضافة للمفضلة",
      description: isFavorite(product.id) ? "تم إزالة المنتج من المفضلة" : "تم إضافة المنتج إلى المفضلة",
    });
  };
  
  const handleAddToCartClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await addToCart(product.id);
    toast({
      title: "تمت الإضافة للسلة",
      description: "تم إضافة المنتج إلى سلة التسوق بنجاح",
    });
  };

  return (
    <Card className="modern-card bg-white border border-gray-100 overflow-hidden scale-in">
      <div className="relative h-44 group">
        <img
          src={product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        
        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          {product.is_featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs px-3 py-1 flex items-center shadow-lg border border-yellow-300/50 backdrop-blur-sm">
              <Star className="h-3 w-3 ml-1 fill-current" />
              مميز
            </Badge>
          )}
          <Button 
            type="button"
            size="sm" 
            variant="ghost" 
            className="h-9 w-9 p-0 bg-white/90 hover:bg-white rounded-full shadow-lg backdrop-blur-sm border border-white/50 transition-all duration-200 hover:scale-110 active:scale-95"
            onClick={handleFavoriteClick}
            aria-label={isFavorite(product.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <Heart className={`h-4 w-4 transition-all duration-200 ${
              isFavorite(product.id) 
                ? 'text-red-500 fill-red-500 scale-110' 
                : 'text-gray-600 hover:text-red-400'
            }`} />
          </Button>
        </div>

        {/* Stock status */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-gray-800 font-arabic text-sm font-medium">غير متوفر</span>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 font-arabic line-clamp-1 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm font-arabic line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-900 font-arabic">{product.price.toLocaleString('ar-EG')}</span>
              <span className="text-sm text-gray-500 mr-1">ريال</span>
            </div>
            <ProductRating productId={product.id} showCount={false} size="sm" />
          </div>
          
          <Button 
            type="button"
            size="sm" 
            className="modern-button bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-arabic px-4 py-2 h-10 shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleAddToCartClick}
            disabled={!product.in_stock}
            aria-disabled={!product.in_stock}
            aria-label="إضافة المنتج إلى السلة"
          >
            <ShoppingCart className="h-4 w-4 ml-1" />
            أضف
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileProductCard;
