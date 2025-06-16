
import { useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CartContext, CartItem } from './CartContext';
import { 
  fetchCartItems, 
  addCartItem, 
  updateCartItemQuantity, 
  removeCartItem, 
  clearAllCartItems 
} from './cartService';
import { generateOrderText, openWhatsApp } from './cartUtils';

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadCartItems = async () => {
    try {
      const items = await fetchCartItems();
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    setLoading(true);
    try {
      const existingItem = cartItems.find(item => item.product_id === productId);
      
      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        await addCartItem(productId, quantity);
        await loadCartItems();
      }
      
      toast({
        title: "تم إضافة المنتج",
        description: "تم إضافة المنتج إلى سلة التسوق بنجاح",
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة المنتج إلى السلة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      await removeCartItem(itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج من سلة التسوق",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      await updateCartItemQuantity(itemId, quantity);
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      await clearAllCartItems();
      setCartItems([]);
      
      toast({
        title: "تم مسح السلة",
        description: "تم مسح جميع المنتجات من السلة",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "السلة فارغة",
        description: "يرجى إضافة منتجات إلى السلة أولاً",
        variant: "destructive",
      });
      return;
    }

    const orderText = generateOrderText(cartItems, total);
    openWhatsApp(orderText);
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      handleOrder,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};
