
export const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

/**
 * توليد نص فاتورة واتساب بتنسيق احترافي يشمل جميع التفاصيل
 */
export const generateOrderText = (
  cartItems: any[],
  total: number,
  invoiceNumber?: number,
  orderDate?: Date,
  customerName?: string,
  customerAddress?: string,
  customerPhone?: string
) => {
  // إعداد المعلومات الرئيسية
  const storeName = "متجر الحلوى الذكية 🍬";
  const logo = "🍬";
  const currentDate = orderDate
    ? orderDate.toLocaleString('ar-YE', { dateStyle: 'short', timeStyle: 'short' })
    : new Date().toLocaleString('ar-YE', { dateStyle: 'short', timeStyle: 'short' });

  // ملخص الأصناف
  const uniqueProducts = cartItems.length;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // بناء نص الفاتورة
  let orderText = `${logo} *${storeName}*\n`;
  if (invoiceNumber !== undefined) orderText += `*فاتورة رقم:* ${invoiceNumber}\n`;
  orderText += `*تاريخ الطلب:* ${currentDate}\n`;
  orderText += '-------------------------------------\n';

  orderText += '📋 *تفاصيل الطلب:*\n';
  cartItems.forEach((item, idx) => {
    const name = item.product?.name || "";
    const qty = item.quantity;
    const price = item.product?.price || 0;
    orderText += `${idx + 1}. ${name}\n   الكمية: ${qty} × ${price} = *${price * qty}* ريال\n`;
  });
  orderText += '-------------------------------------\n';

  orderText += `عدد الأصناف: ${uniqueProducts}\nإجمالي القطع: ${totalItems}\nالمجموع الكلي: *${total.toFixed(2)}* ريال يمني\n`;

  orderText += '-------------------------------------\n';
  orderText += `📍 *معلومات التوصيل:*\n`;
  orderText += customerName ? `الاسم: ${customerName}\n` : '';
  orderText += customerAddress ? `العنوان: ${customerAddress}\n` : '---\n';
  orderText += customerPhone ? `الجوال: ${customerPhone}\n` : '';
  // إذا أردت جمع بيانات العميل من نموذج ستظهر هنا فعليًا.

  orderText += '-------------------------------------\n';
  orderText += `🚚 *طرق التوصيل:*\n- شحن داخلي / توصيل مباشر\n\n💰 *طرق الدفع:*\n- دفع عند الاستلام\n- تحويل بنكي\n`;

  orderText += '-------------------------------------\n';
  orderText += '☎️ *للتواصل مع المتجر:*\nواتساب: 770006120\n';

  // بإمكانك لاحقاً تضمين QR أو رابط إذا رغبت
  return orderText;
};

export const openWhatsApp = (orderText: string) => {
  const whatsappNumber = "967770006120";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappUrl, '_blank');
};
