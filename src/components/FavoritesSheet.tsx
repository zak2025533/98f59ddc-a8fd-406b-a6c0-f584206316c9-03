
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface FavoritesSheetProps {
  triggerClassName?: string;
  iconClassName?: string;
}

export const FavoritesSheet = ({ triggerClassName, iconClassName }: FavoritesSheetProps) => {
  const { favorites, favoriteCount, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className={cn("relative h-12 px-4 text-white hover:bg-white/20 font-arabic", triggerClassName)}>
          <Heart className={cn("h-5 w-5 ml-2", iconClassName)} />
          المفضلة
          {favoriteCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-yellow-400 text-blue-900 font-bold">
              {favoriteCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-right font-arabic text-blue-900">المفضلة ({favoriteCount} منتج)</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col flex-1 min-h-0">
          {favorites.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-16 w-16 mx-auto text-blue-300 mb-4" />
                <p className="text-blue-600 font-arabic">لا توجد منتجات مفضلة</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4 -mx-6 px-6">
              {favorites.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-blue-200 rounded-lg bg-white/50 backdrop-blur-sm">
                  <img
                    src={item.product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=100&q=80"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded border border-blue-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-right font-arabic text-blue-900">{item.product.name}</h3>
                    <p className="text-blue-700 font-bold font-arabic">{item.product.price} ريال</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => addToCart(item.product_id)}
                      className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-blue-900 font-bold shadow-md"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromFavorites(item.product_id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
