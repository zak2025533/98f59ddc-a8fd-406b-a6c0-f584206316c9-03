
import { useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CartContext, CartItem } from './CartContext';
import { 
  fetchCartItems, 
  addCartItem, 
  updateCartItemQuantity, 
  removeCartItem, 
  clearAllCartItems,
  createOrderWithItems,
  updateOrderWhatsappMessage // 👈 ADD THIS!
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
      console.log('Loading cart items...');
      const items = await fetchCartItems();
      setCartItems(items);
      console.log('Cart items loaded:', items.length);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل عناصر السلة",
        variant: "destructive",
      });
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    if (!productId) {
      console.error('Product ID is required');
      return;
    }

    setLoading(true);
    try {
      console.log('Adding to cart:', { productId, quantity });
      const existingItem = cartItems.find(item => item.product_id === productId);
      
      if (existingItem) {
        console.log('Item exists, updating quantity');
        await updateQuantity(existingItem.id, existingItem.quantity + quantity);
      } else {
        console.log('New item, adding to cart');
        await addCartItem(productId, quantity);
        await loadCartItems();
      }
      
      console.log('Successfully added to cart');
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
    if (!itemId) {
      console.error('Item ID is required');
      return;
    }

    try {
      console.log('Removing from cart:', itemId);
      await removeCartItem(itemId);
      setCartItems(prev => prev.filter(item => item.id !== itemId));
      
      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج من سلة التسوق",
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف المنتج من السلة",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!itemId) {
      console.error('Item ID is required');
      return;
    }

    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      console.log('Updating quantity:', { itemId, quantity });
      await updateCartItemQuantity(itemId, quantity);
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث الكمية",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      console.log('Clearing cart...');
      await clearAllCartItems();
      setCartItems([]);
      
      toast({
        title: "تم مسح السلة",
        description: "تم مسح جميع المنتجات من السلة",
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "خطأ",
        description: "فشل في مسح السلة",
        variant: "destructive",
      });
    }
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "السلة فارغة",
        description: "يرجى إضافة منتجات إلى السلة أولاً",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Processing order...');

      // الحصول على رقم الفاتورة الحالي مباشرة بعد الإدخال
      // (سيتم توليد نص الفاتورة بعد الحصول على رقم الفاتورة والتاريخ)
      const tempOrderDate = new Date();

      // أولاً، حفظ الطلب بدون نص الرسالة (سينتج لنا invoiceNumber)
      // ثم توليد النص النهائي واستعماله
      const { orderId, invoiceNumber } = await createOrderWithItems(
        cartItems,
        total,
        "", // سيتم تحديث الرسالة أدناه
        undefined,
        undefined,
        undefined
      );

      // الآن توليد نص الرسالة بعد معرفة رقم الفاتورة وتاريخها
      const orderText = generateOrderText(
        cartItems,
        total,
        invoiceNumber,
        tempOrderDate
      );

      // تحديث الطلب بنص الرسالة الجديد بدقة فائقة
      await updateOrderWhatsappMessage(orderId, orderText);

      await clearAllCartItems();
      setCartItems([]);

      toast({
        title: "تم إنشاء الطلب بنجاح",
        description: `رقم الفاتورة: #${invoiceNumber}. يمكنك متابعة الطلب من لوحة الإدارة.`,
      });

      openWhatsApp(orderText);

    } catch (error: any) {
      console.error('Error processing order:', error);
      toast({
        title: "خطأ",
        description: "فشل في معالجة الطلب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
