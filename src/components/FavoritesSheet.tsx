
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface FavoritesSheetProps {
  triggerClassName?: string;
  iconClassName?: string;
}

export const FavoritesSheet = ({ triggerClassName, iconClassName }: FavoritesSheetProps) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const { toast } = useToast();

  const favoriteProducts = products.filter(product => favorites.includes(product.id));
  const favoritesCount = favorites.length;

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
    toast({
      title: "تمت الإضافة للسلة",
      description: "تم إضافة المنتج إلى سلة التسوق بنجاح",
    });
  };

  const handleRemoveFromFavorites = (productId: string) => {
    toggleFavorite(productId);
    toast({
      title: "تمت الإزالة من المفضلة",
      description: "تم إزالة المنتج من المفضلة",
    });
  };

  const defaultTriggerClasses = "relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={triggerClassName || defaultTriggerClasses}
          data-favorites-trigger
          data-testid="favorites-trigger"
        >
          <Heart className={iconClassName || "h-5 w-5"} />
          {favoritesCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
              {favoritesCount > 99 ? "99+" : favoritesCount}
            </Badge>
          )}
          {triggerClassName && <span className="mr-2 font-arabic">المفضلة</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[85vw] sm:w-[320px] sm:max-w-sm h-[70vh] sm:h-[80vh] bg-gradient-to-br from-pink-50 to-red-50">
        <div className="h-full flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-right font-arabic text-pink-900">
              المفضلة ({favoritesCount} منتج)
            </SheetTitle>
          </SheetHeader>
          
          {favoriteProducts.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-16 w-16 mx-auto text-pink-300 mb-4" />
                <p className="text-pink-600 font-arabic">لا توجد منتجات مفضلة</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {favoriteProducts.map((product) => (
                <div key={product.id} className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-pink-200">
                  <div className="flex gap-4">
                    <img
                      src={product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=100&q=80"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-pink-900 font-arabic">{product.name}</h3>
                      <p className="text-sm text-pink-700 font-arabic">{product.price} ريال يمني</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(product.id)}
                          className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-arabic text-xs"
                        >
                          <ShoppingCart className="h-3 w-3 ml-1" />
                          أضف للسلة
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveFromFavorites(product.id)}
                          className="border-pink-300 text-pink-700 hover:bg-pink-100 font-arabic text-xs"
                        >
                          إزالة
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
