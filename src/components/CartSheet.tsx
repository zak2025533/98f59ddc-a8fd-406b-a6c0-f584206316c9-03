import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CartHeader } from "./cart/CartHeader";
import { EmptyCart } from "./cart/EmptyCart";
import { CartItemCard } from "./cart/CartItemCard";
import { CartSummary } from "./cart/CartSummary";
import { Badge } from "@/components/ui/badge";
import { useOrder, DeliveryInfo } from "@/hooks/useOrder";

interface CartSheetProps {
  triggerClassName?: string;
  iconClassName?: string;
}

const distributionPoints = [
  {
    name: "فرع صنعاء",
    address: "شارع الجامعة، صنعاء",
    phone: "01-1234567"
  },
  {
    name: "فرع تعز",
    address: "شارع التحرير، تعز",
    phone: "04-7654321"
  },
  {
    name: "نقطة استلام إب",
    address: "شارع 22 مايو، إب",
    phone: "05-9876543"
  }
];

export const CartSheet = ({ triggerClassName, iconClassName }: CartSheetProps) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { handleOrderWithDeliveryInfo } = useOrder();

  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    fullAddress: "",
    phoneNumber: "",
    recipientName: "",
  });
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    setDeliveryInfo((prev) => ({ ...prev, [field]: value }));
  };

  const onHandleOrder = async () => {
    await handleOrderWithDeliveryInfo(deliveryInfo);
    clearCart();
  };

  const defaultTriggerClasses = "relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={triggerClassName || defaultTriggerClasses}
          data-cart-trigger
        >
          <ShoppingCart className={iconClassName || "h-5 w-5"} />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </Badge>
          )}
          {triggerClassName && <span className="mr-2 font-arabic">سلة التسوق</span>}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="h-full flex flex-col">
          <CartHeader cartCount={cartCount} />

          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4 font-arabic">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeFromCart}
                  />
                ))}

                {/* زر إظهار/إخفاء نموذج التوصيل */}
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full font-arabic"
                    onClick={() => setShowDeliveryForm(!showDeliveryForm)}
                  >
                    {showDeliveryForm ? "إخفاء بيانات التوصيل" : "إضافة/تعديل بيانات التوصيل (اختياري)"}
                  </Button>
                </div>

                {/* نموذج بيانات التوصيل */}
                {showDeliveryForm && (
                  <div className="bg-white p-4 rounded-lg shadow-md space-y-4 mt-4">
                    <h2 className="text-lg font-bold mb-2">معلومات التوصيل (اختياري)</h2>

                    <input
                      type="text"
                      placeholder="العنوان الكامل"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={deliveryInfo.fullAddress}
                      onChange={(e) => handleInputChange("fullAddress", e.target.value)}
                    />

                    <input
                      type="tel"
                      placeholder="رقم الهاتف"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={deliveryInfo.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="اسم المستلم"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={deliveryInfo.recipientName}
                      onChange={(e) => handleInputChange("recipientName", e.target.value)}
                    />
                  </div>
                )}

                {/* نقاط التوزيع */}
                <div className="bg-white p-4 rounded-lg shadow-md space-y-2 mt-6 font-arabic">
                  <h2 className="text-lg font-bold mb-2">نقاط التوزيع والاستلام المتاحة</h2>
                  {distributionPoints.map((point, idx) => (
                    <div key={idx} className="border-b border-gray-200 pb-2 last:border-0">
                      <p><strong>{point.name}</strong></p>
                      <p>📍 {point.address}</p>
                      <p>📞 {point.phone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <CartSummary
                total={total}
                onClearCart={clearCart}
                onHandleOrder={onHandleOrder}
              />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
