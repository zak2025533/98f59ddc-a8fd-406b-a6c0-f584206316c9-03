
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
import { cn } from "@/lib/utils";

interface CartSheetProps {
  triggerClassName?: string;
  iconClassName?: string;
}

export const CartSheet = ({ triggerClassName, iconClassName }: CartSheetProps) => {
  const { cartItems, cartCount, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { handleOrderWithDeliveryInfo } = useOrder();
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOrder = () => {
    setIsOpen(false);
    setShowDeliveryDialog(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className={cn("relative h-12 px-4 text-white hover:bg-white/20 font-arabic", triggerClassName)}>
            <ShoppingCart className={cn("h-5 w-5 ml-2", iconClassName)} />
            سلة التسوق
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-yellow-400 text-blue-900 font-bold">
                {cartCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
          <CartHeader cartCount={cartCount} />
          <div className="mt-6 flex flex-col flex-1 min-h-0">
            {cartItems.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 -mx-6 px-6">
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeFromCart}
                    />
                  ))}
                </div>
                <div className="px-6">
                  <CartSummary
                    total={total}
                    onClearCart={clearCart}
                    onHandleOrder={handleOrder}
                  />
                </div>
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
