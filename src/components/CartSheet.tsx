import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { DeliveryInfoDialog } from "./DeliveryInfoDialog";

interface DeliveryInfo {
  fullAddress: string;
  phoneNumber: string;
  recipientName: string;
}

export const CartSheet = () => {
  const { cartItems, cartCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [showDeliveryDialog, setShowDeliveryDialog] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const generateInvoiceMessage = (deliveryInfo?: DeliveryInfo) => {
    let message = "═══════════════════════════\n";
    message += "🍬 *بـــلا حــدود للحــلــويــات* 🍬\n";
    message += "═══════════════════════════\n\n";
    
    message += "📋 *تفاصيل طلبكم الكريم*\n";
    message += "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n";

    cartItems.forEach((item, index) => {
      message += `🔸 *المنتج رقم ${index + 1}:*\n`;
      message += `   📦 الصنف: *${item.product.name}*\n`;
      message += `   🔢 الكمية: *${item.quantity}* قطعة\n`;
      message += `   💰 السعر للوحدة: *${item.product.price.toFixed(2)}* ريال يمني\n`;
      message += `   📊 المبلغ الجزئي: *${(item.product.price * item.quantity).toFixed(2)}* ريال يمني\n`;
      message += "   ━━━━━━━━━━━━━━━━━━━━━━━\n";
    });

    message += "\n💳 *ملخص الفاتورة:*\n";
    message += "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n";
    message += `🛒 عدد الأصناف: *${cartItems.length}* صنف\n`;
    message += `📦 إجمالي القطع: *${cartItems.reduce((sum, item) => sum + item.quantity, 0)}* قطعة\n`;
    message += `💵 *المبلغ الإجمالي: ${total.toFixed(2)} ريال يمني*\n\n`;

    message += "📍 *معلومات التوصيل:*\n";
    message += "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n";
    
    if (deliveryInfo) {
      message += `🏠 العنوان الكامل: *${deliveryInfo.fullAddress || '_لم يتم تحديده_'}*\n`;
      message += `📱 رقم الهاتف: *${deliveryInfo.phoneNumber || '_لم يتم تحديده_'}*\n`;
      message += `👤 اسم المستلم: *${deliveryInfo.recipientName || '_لم يتم تحديده_'}*\n\n`;
    } else {
      message += "🏠 العنوان الكامل: _يرجى كتابة عنوان التوصيل_\n";
      message += "📱 رقم الهاتف: _يرجى كتابة رقم التواصل_\n";
      message += "👤 اسم المستلم: _يرجى كتابة الاسم_\n\n";
    }

    message += "🚚 *طرق التوصيل المتاحة:*\n";
    message += "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n";
    message += "⚡ توصيل سريع (خلال ساعتين)\n";
    message += "🕐 توصيل عادي (خلال 24 ساعة)\n";
    message += "🏪 استلام من المحل\n\n";

    message += "💰 *طرق الدفع:*\n";
    message += "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n";
    message += "💵 دفع نقدي عند الاستلام\n";
    message += "💳 تحويل بنكي\n\n";

    message += "═══════════════════════════\n";
    message += "📞 *للتأكيد والاستفسار:*\n";
    message += "WhatsApp: 967715833246\n";
    message += "📧 motahr4742@gmail.com\n";
    message += "📍 اليمن - محافظة إب\n";
    message += "═══════════════════════════\n\n";

    message += "🌟 *شكراً لثقتكم بنا*\n";
    message += "💝 *بلا حدود للحلويات*\n";
    message += "_حيث الطعم الأصيل والجودة العالية_ ✨";

    return message;
  };

  const saveOrderToDatabase = async (whatsappMessage: string, deliveryInfo?: DeliveryInfo) => {
    try {
      const sessionId = localStorage.getItem('session_id') || 'session_' + Math.random().toString(36).substr(2, 9);
      
      // حفظ الطلب الرئيسي
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          session_id: sessionId,
          total_amount: total,
          status: 'pending',
          whatsapp_message: whatsappMessage,
          customer_name: deliveryInfo?.recipientName || null,
          customer_phone: deliveryInfo?.phoneNumber || null,
          customer_address: deliveryInfo?.fullAddress || null
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // حفظ عناصر الطلب
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      console.log('تم حفظ الطلب بنجاح:', order.id);
      
      toast({
        title: "تم حفظ الطلب",
        description: "تم حفظ طلبك بنجاح في النظام",
      });

      return order.id;
    } catch (error) {
      console.error('خطأ في حفظ الطلب:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ الطلب",
        variant: "destructive",
      });
    }
  };

  const handleOrderWithDeliveryInfo = async (deliveryInfo: DeliveryInfo) => {
    const message = generateInvoiceMessage(deliveryInfo);
    
    // حفظ الطلب في قاعدة البيانات أولاً
    await saveOrderToDatabase(message, deliveryInfo);
    
    // فتح واتساب
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/967715833246?text=${encodedMessage}`, '_blank');
  };

  const handleOrder = () => {
    setShowDeliveryDialog(true);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="relative h-12 px-4 hover:bg-orange-100 text-orange-800 font-arabic border border-orange-200">
            <ShoppingCart className="h-5 w-5 ml-2" />
            سلة التسوق
            {cartCount > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-orange-600 hover:bg-orange-700">
                {cartCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] bg-gradient-to-br from-orange-50 to-yellow-50">
          <SheetHeader>
            <SheetTitle className="text-right font-arabic text-orange-900">سلة التسوق ({cartCount} منتج)</SheetTitle>
          </SheetHeader>
          <div className="mt-6 flex flex-col h-full">
            {cartItems.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingCart className="h-16 w-16 mx-auto text-orange-300 mb-4" />
                  <p className="text-orange-600 font-arabic">سلة التسوق فارغة</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-orange-200 rounded-lg bg-white/50 backdrop-blur-sm">
                      <img
                        src={item.product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=100&q=80"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded border border-orange-200"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-right font-arabic text-orange-900">{item.product.name}</h3>
                        <p className="text-orange-700 font-bold font-arabic">{item.product.price} ريال يمني</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="border-orange-300 text-orange-700 hover:bg-orange-100"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-arabic text-orange-900 font-semibold">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-orange-300 text-orange-700 hover:bg-orange-100"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-orange-200 pt-4 space-y-4 bg-white/30 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="font-arabic text-orange-900">المجموع: {total.toFixed(2)} ريال يمني</span>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={handleOrder} className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-arabic shadow-lg">
                      إتمام الطلب عبر واتساب
                    </Button>
                    <Button variant="outline" className="w-full font-arabic border-orange-300 text-orange-700 hover:bg-orange-50" onClick={clearCart}>
                      مسح السلة
                    </Button>
                  </div>
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
