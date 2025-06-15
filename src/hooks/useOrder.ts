import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export interface DeliveryInfo {
  fullAddress: string;
  phoneNumber: string;
  recipientName: string;
}

export const useOrder = () => {
  const { cartItems, total, clearCart } = useCart();
  const { toast } = useToast();

  const generateInvoiceMessage = (
    deliveryInfo?: DeliveryInfo,
    orderDetails?: { createdAt: string }
  ) => {
    let message = "═══════════════════════════\n";
    message += "🍬 *بـــلا حــدود للحــلــويــات* 🍬\n";
    message += "═══════════════════════════\n\n";
    
    if (orderDetails) {
      message += `🗓️ *التاريخ: ${new Date(orderDetails.createdAt).toLocaleString('ar-EG', { dateStyle: 'medium', timeStyle: 'short'})}*\n\n`;
    }

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
    
    if (deliveryInfo && (deliveryInfo.fullAddress || deliveryInfo.phoneNumber || deliveryInfo.recipientName)) {
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

  const saveOrderToDatabase = async (deliveryInfo?: DeliveryInfo) => {
    try {
      const sessionId = localStorage.getItem('session_id') || 'session_' + Math.random().toString(36).substr(2, 9);
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          session_id: sessionId,
          total_amount: total,
          status: 'pending',
          customer_name: deliveryInfo?.recipientName || null,
          customer_phone: deliveryInfo?.phoneNumber || null,
          customer_address: deliveryInfo?.fullAddress || null
        })
        .select()
        .single();

      if (orderError) throw orderError;

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
        title: "تم إنشاء الطلب",
        description: "تم إنشاء طلبك بنجاح وجاري إعداد الفاتورة",
      });

      return order;
    } catch (error) {
      console.error('خطأ في حفظ الطلب:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ الطلب",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateOrderWithMessage = async (orderId: string, message: string) => {
    try {
        const { error } = await supabase
            .from('orders')
            .update({ whatsapp_message: message })
            .eq('id', orderId);

        if (error) throw error;
    } catch (error) {
        console.error('خطأ في تحديث الطلب بالرسالة:', error);
        toast({
            title: "خطأ",
            description: "فشل في تحديث رسالة الطلب",
            variant: "destructive",
        });
    }
  };

  const handleOrderWithDeliveryInfo = async (deliveryInfo: DeliveryInfo) => {
    const order = await saveOrderToDatabase(deliveryInfo);

    if (!order) {
      toast({
        title: "خطأ في الطلب",
        description: "لم نتمكن من إنشاء طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
      return;
    }

    const message = generateInvoiceMessage(deliveryInfo, {
        createdAt: order.created_at,
    });
    
    await updateOrderWithMessage(order.id, message);
    
    await clearCart();
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/967715833246?text=${encodedMessage}`, '_blank');
  };

  return { handleOrderWithDeliveryInfo };
}
