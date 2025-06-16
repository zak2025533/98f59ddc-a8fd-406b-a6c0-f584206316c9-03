
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  total: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getSessionId = () => {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  };

  const fetchCartItems = async () => {
    try {
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
      
      const formattedItems = (data || []).map(item => ({
        id: item.id,
        product_id: item.product_id,
        quantity: item.quantity,
        product: item.products as any
      }));
      
      setCartItems(formattedItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    setLoading(true);
    try {
      const sessionId = getSessionId();
      
      // Check if item already exists
      const existingItem = cartItems.find(item => item.product_id === productId);
      
      if (existingItem) {
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({
            session_id: sessionId,
            product_id: productId,
            quantity
          });

        if (error) throw error;
        await fetchCartItems();
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
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
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
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId);

      if (error) throw error;
      
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
      const sessionId = getSessionId();
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('session_id', sessionId);

      if (error) throw error;
      setCartItems([]);
      
      toast({
        title: "تم مسح السلة",
        description: "تم مسح جميع المنتجات من السلة",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
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
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
