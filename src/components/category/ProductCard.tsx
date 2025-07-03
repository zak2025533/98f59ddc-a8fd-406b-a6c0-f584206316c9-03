
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";
import ProductRating from "@/components/ProductRating";
import { useNavigate } from "react-router-dom";
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

interface ProductCardProps {
  product: Product;
  isFavorite: (productId: string) => boolean;
  onAddToCart: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
}

const ProductCard = ({ product, isFavorite, onAddToCart, onToggleFavorite }: ProductCardProps) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };
  
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <Card 
      className="hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden border-2 border-blue-200 bg-white"
      onClick={handleCardClick}
    >
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
            onClick={handleFavoriteClick}
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
          <ProductRating productId={product.id} showCount={false} size="sm" />
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
            onClick={handleAddToCartClick}
          >
            <ShoppingCart className="h-4 w-4 ml-1" />
            أضف للسلة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
