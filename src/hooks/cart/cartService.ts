
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
