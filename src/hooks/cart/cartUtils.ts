
export const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

export const generateOrderText = (cartItems: any[], total: number) => {
  let orderText = "مرحباً، أود طلب:\n\n";
  cartItems.forEach(item => {
    orderText += `• ${item.product.name} - الكمية: ${item.quantity} - ${item.product.price * item.quantity} ريال يمني\n`;
  });
  orderText += `\nالمجموع الكلي: ${total.toFixed(2)} ريال يمني`;
  return orderText;
};

export const openWhatsApp = (orderText: string) => {
  const whatsappNumber = "967777777777"; // Replace with actual number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`;
  window.open(whatsappUrl, '_blank');
};
