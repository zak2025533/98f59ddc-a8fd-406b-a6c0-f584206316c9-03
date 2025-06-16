
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
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
  isFavorite: (productId: string) => boolean;
  onAddToCart: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
}

const MobileProductCard = ({ product, isFavorite, onAddToCart, onToggleFavorite }: MobileProductCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };
  
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative h-40">
        <img
          src={product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        
        {/* Action buttons overlay */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.is_featured && (
            <Badge className="bg-yellow-500 text-yellow-900 text-xs px-2 py-1">
              <Star className="h-3 w-3 ml-1" />
              مميز
            </Badge>
          )}
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 w-8 p-0 bg-white/80 hover:bg-white rounded-full"
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-4 w-4 ${isFavorite(product.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>

        {/* Stock status */}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-arabic text-sm">غير متوفر</span>
          </div>
        )}
      </div>

      <CardContent className="p-3">
        <div className="mb-2">
          <h3 className="text-base font-bold text-gray-900 font-arabic line-clamp-1 mb-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm font-arabic line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-lg font-bold text-blue-600 font-arabic">{product.price}</span>
              <span className="text-xs text-gray-500 mr-1">ريال</span>
            </div>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-500 mr-1">4.8</span>
            </div>
          </div>
          
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-arabic px-3 py-2 h-9"
            onClick={handleAddToCartClick}
            disabled={!product.in_stock}
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
