
import { ReactNode } from 'react';
import { CartContext } from './CartContext';
import { useCartState } from './useCartState';

interface CartProviderProps {
  children: ReactNode;
}

/**
 * Clean CartProvider wrapper, delegates to the useCartState hook.
 */
export const CartProvider = ({ children }: CartProviderProps) => {
  const cartState = useCartState();

  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
};
