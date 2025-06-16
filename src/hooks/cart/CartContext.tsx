
import { createContext } from 'react';

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

export interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  total: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  handleOrder: () => void;
  loading: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
