
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";

export const FavoritesSheet = () => {
  const { favorites, favoriteCount, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-12 px-4 hover:bg-blue-50 text-blue-700 font-arabic">
          <Heart className="h-5 w-5 ml-2" />
          المفضلة
          {favoriteCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs">
              {favoriteCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-right font-arabic">المفضلة ({favoriteCount} منتج)</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col h-full">
          {favorites.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 font-arabic">لا توجد منتجات مفضلة</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {favorites.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={item.product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=100&q=80"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-right font-arabic">{item.product.name}</h3>
                    <p className="text-blue-800 font-bold font-arabic">{item.product.price} ريال</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => addToCart(item.product_id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-blue-800"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromFavorites(item.product_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
