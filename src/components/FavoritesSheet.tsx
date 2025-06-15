
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
        <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/20 px-3 h-10 font-arabic">
          <Heart className="h-5 w-5 ml-2" />
          المفضلة
          {favoriteCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-amber-500 hover:bg-amber-600 text-white">
              {favoriteCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-gradient-to-br from-amber-50 to-orange-50">
        <SheetHeader className="border-b border-amber-200 pb-4">
          <SheetTitle className="text-right font-arabic text-amber-800 text-xl">
            قائمة المفضلة ({favoriteCount} منتج)
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col h-full">
          {favorites.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-16 w-16 mx-auto text-amber-300 mb-4" />
                <p className="text-amber-600 font-arabic text-lg">لا توجد منتجات مفضلة</p>
                <p className="text-amber-500 font-arabic text-sm mt-2">ابدأ بإضافة منتجاتك المفضلة</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {favorites.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-amber-200 rounded-xl bg-white/50 hover:bg-white/70 transition-colors shadow-sm">
                  <img
                    src={item.product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=100&q=80"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border-2 border-amber-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-right font-arabic text-amber-800 mb-1">{item.product.name}</h3>
                    <p className="text-amber-600 font-bold font-arabic text-lg">{item.product.price} ريال</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => addToCart(item.product_id)}
                      className="bg-amber-600 hover:bg-amber-700 text-white border-0 h-8 w-8 p-0 shadow-md"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromFavorites(item.product_id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
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
