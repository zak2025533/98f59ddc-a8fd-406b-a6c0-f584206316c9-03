import { supabase } from '@/integrations/supabase/client';
import { CartItem } from './CartContext';
import { getSessionId } from './cartUtils';

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const sessionId = getSessionId();
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      product_id,
      quantity,
      products (
        id,
        name,
        price,
        image_url
      )
    `)
    .eq('session_id', sessionId);

  if (error) throw error;
  
  return (data || []).map(item => ({
    id: item.id,
    product_id: item.product_id,
    quantity: item.quantity,
    product: item.products as any
  }));
};

export const addCartItem = async (productId: string, quantity: number) => {
  const sessionId = getSessionId();
  const { error } = await supabase
    .from('cart_items')
    .insert({
      session_id: sessionId,
      product_id: productId,
      quantity
    });

  if (error) throw error;
};

export const updateCartItemQuantity = async (itemId: string, quantity: number) => {
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId);

  if (error) throw error;
};

export const removeCartItem = async (itemId: string) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId);

  if (error) throw error;
};

export const clearAllCartItems = async () => {
  const sessionId = getSessionId();
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('session_id', sessionId);

  if (error) throw error;
};

/**
 * Creates an order and its items in the database.
 * @param cartItems
 * @param total
 * @param whatsappMessage
 * @returns { orderId, invoiceNumber }
 */
export const createOrderWithItems = async (
  cartItems: CartItem[],
  total: number,
  whatsappMessage: string,
  customerName?: string,
  customerPhone?: string,
  customerAddress?: string,
) => {
  const sessionId = getSessionId();

  // 1. Insert order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([{
      session_id: sessionId,
      total_amount: total,
      whatsapp_message: whatsappMessage,
      customer_name: customerName ?? null,
      customer_phone: customerPhone ?? null,
      customer_address: customerAddress ?? null,
    }])
    .select('id, invoice_number')
    .single();

  if (orderError || !orderData) throw new Error(orderError?.message ?? "خطأ أثناء إنشاء الطلب");

  const orderId = orderData.id;
  const invoiceNumber = orderData.invoice_number;

  // 2. Insert order items
  const itemsToInsert = cartItems.map(item => ({
    order_id: orderId,
    product_id: item.product.id,
    product_name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
  }));
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(itemsToInsert);

  if (itemsError) throw new Error(itemsError.message);

  return { orderId, invoiceNumber };
};

/**
 * تحديث نص رسالة واتساب للطلب بعد توليدها المفصل
 */
export const updateOrderWhatsappMessage = async (
  orderId: string,
  whatsappMessage: string
) => {
  const { error } = await supabase
    .from('orders')
    .update({
      whatsapp_message: whatsappMessage,
    })
    .eq('id', orderId);

  if (error) throw new Error(error.message);
};
