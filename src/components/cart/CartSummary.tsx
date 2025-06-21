import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { MessageCircle, Trash2 } from "lucide-react";

interface CartSummaryProps {
  total: number;
  onClearCart: () => void;
}

export const CartSummary = ({ total, onClearCart }: CartSummaryProps) => {
  const { cartItems } = useCart();

  const generateWhatsAppMessage = () => {
    let message = `
═══════════════════════════
🍬 *بـــلا حــدود للحــلــويــات* 🍬
═══════════════════════════

📋 *تفاصيل طلبكم الكريم*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
`;

    cartItems.forEach((item, index) => {
      message += `
🔸 *المنتج رقم ${index + 1}:*
📦 الصنف: *${item.product.name}*
🔢 الكمية: ${item.quantity}
💰 السعر للوحدة: ${item.product.price.toFixed(2)} ريال
📊 المبلغ الجزئي: ${(item.product.price * item.quantity).toFixed(2)} ريال
━━━━━━━━━━━━━━━━━━━━━━━
`;
    });

    const totalItems = cartItems.length;
    const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    message += `
💳 *ملخص الفاتورة:*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
🛒 عدد الأصناف: ${totalItems}
📦 إجمالي القطع: ${totalQuantity}
💵 *المبلغ الإجمالي:* ${total.toFixed(2)} ريال يمني

📍 *معلومات التوصيل:*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
🏠 العنوان الكامل: _يرجى كتابة عنوان التوصيل_
📱 رقم الهاتف: _يرجى كتابة رقم التواصل_
👤 اسم المستلم: _يرجى كتابة الاسم_

🚚 *طرق التوصيل المتاحة:*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
⚡ توصيل سريع (خلال ساعتين)
🕐 توصيل عادي (خلال 24 ساعة)
🏪 استلام من المحل

💰 *طرق الدفع:*
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
💵 دفع نقدي عند الاستلام
💳 تحويل بنكي

═══════════════════════════
📞 *للتأكيد والاستفسار:*
WhatsApp: 967715833246
📧 motahr4742@gmail.com
📍 اليمن - محافظة إب
═══════════════════════════

🌟 *شكراً لثقتكم بنا*
💝 *بلا حدود للحلويات*
_حيث الطعم الأصيل والجودة العالية_ ✨
    `;

    return `https://wa.me/967715833246?text=${encodeURIComponent(message)}`;
  };

  return (
    <div dir="rtl" className="border-t border-blue-200 pt-4 space-y-4 bg-white/30 backdrop-blur-sm rounded-lg p-4">
      <div className="flex justify-between items-center text-lg font-bold">
        <span className="font-arabic text-blue-900">
          المجموع الكلي: {total.toFixed(2)} ريال يمني
        </span>
      </div>

      <div className="space-y-2">
        <Button
          asChild
          className="w-full bg-green-600 hover:bg-green-700 text-white font-arabic shadow-md flex gap-2 items-center justify-center"
        >
          <a
            href={generateWhatsAppMessage()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="h-5 w-5" />
            <span>إتمام الطلب عبر واتساب</span>
          </a>
        </Button>

        <Button
          variant="outline"
          onClick={onClearCart}
          className="w-full font-arabic text-red-600 border-red-300 hover:bg-red-50 flex gap-2 justify-center"
        >
          <Trash2 className="h-4 w-4" />
          <span>مسح السلة</span>
        </Button>
      </div>
    </div>
  );
};
