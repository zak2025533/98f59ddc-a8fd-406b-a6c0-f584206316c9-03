
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/hooks/cart/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/use-toast";
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
    <Card className="bg-white shadow-sm border border-blue-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-40">
        <img
          src={product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Action buttons overlay */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.is_featured && (
            <Badge className="bg-yellow-500 text-yellow-900 text-xs px-2 py-1 flex items-center">
              <Star className="h-3 w-3 ml-1" />
              مميز
            </Badge>
          )}
          <Button 
            type="button"
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white rounded-full shadow-sm"
            onClick={handleFavoriteClick}
            aria-label={isFavorite(product.id) ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>

        {/* Stock status */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center">
            <span className="text-white font-arabic text-sm">غير متوفر</span>
          </div>
        )}
      </div>

      <CardContent className="p-3">
        <div className="mb-2">
          <h3 className="text-base font-bold text-blue-900 font-arabic line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-blue-600 text-sm font-arabic line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-lg font-bold text-blue-700 font-arabic">{product.price.toLocaleString('ar-EG')}</span>
              <span className="text-xs text-blue-500 mr-1">ريال</span>
            </div>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-blue-500 mr-1">4.8</span>
            </div>
          </div>
          
          <Button 
            type="button"
            size="sm" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-arabic px-3 py-2 h-9"
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
