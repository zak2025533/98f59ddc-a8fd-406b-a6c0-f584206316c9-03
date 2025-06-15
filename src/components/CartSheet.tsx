
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { DeliveryInfoDialog } from "./DeliveryInfoDialog";
import { useOrder } from "@/hooks/useOrder";
import { CartHeader } from "./cart/CartHeader";
import { EmptyCart } from "./cart/EmptyCart";
import { CartItemCard } from "./cart/CartItemCard";
import { CartSummary } from "./cart/CartSummary";

export const CartSheet = () => {
  const { cartItems, cartCount, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { handleOrderWithDeliveryInfo } = useOrder();
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);

  const handleOrder = () => {
    setShowDeliveryDialog(true);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="relative h-12 px-4 text-white hover:bg-white/20 font-arabic">
            <ShoppingCart className="h-5 w-5 ml-2" />
            سلة التسوق
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-yellow-400 text-blue-900 font-bold">
                {cartCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] bg-gradient-to-br from-blue-50 to-indigo-50 h-[85vh] my-auto right-2 rounded-2xl shadow-2xl">
          <CartHeader cartCount={cartCount} />
          <div className="mt-6 flex flex-col h-full">
            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4">
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeFromCart}
                    />
                  ))}
                </div>
                <CartSummary
                  total={total}
                  onClearCart={clearCart}
                  onHandleOrder={handleOrder}
                />
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <DeliveryInfoDialog
        isOpen={showDeliveryDialog}
        onClose={() => setShowDeliveryDialog(false)}
        onSubmit={handleOrderWithDeliveryInfo}
      />
    </>
  );
};
