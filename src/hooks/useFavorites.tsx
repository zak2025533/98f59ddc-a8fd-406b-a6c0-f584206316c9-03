import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FavoriteItem {
  id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

interface FavoritesContextType {
  favorites: string[]; // Array of product IDs
  favoriteItems: FavoriteItem[];
  favoriteCount: number;
  addToFavorites: (productId: string) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getSessionId = () => {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  };

  const fetchFavorites = async () => {
    try {
      const sessionId = getSessionId();
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          product_id,
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
        product: item.products,
      }));

      setFavoriteItems(formattedItems);
    } catch (error) {
      toast({
        title: "فشل في تحميل المفضلة",
        description: "حدث خطأ أثناء تحميل المنتجات المفضلة",
        variant: "destructive",
      });
    }
  };

  const addToFavorites = async (productId: string) => {
    const sessionId = getSessionId();

    if (isFavorite(productId)) return;

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({ session_id: sessionId, product_id: productId });

      if (error) throw error;
      await fetchFavorites();

      toast({ title: "تم الإضافة", description: "تم إضافة المنتج إلى المفضلة" });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إضافة المنتج إلى المفضلة",
        variant: "destructive",
      });
    }
  };

  const removeFromFavorites = async (productId: string) => {
    const sessionId = getSessionId();

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('session_id', sessionId)
        .eq('product_id', productId);

      if (error) throw error;
      setFavoriteItems(prev => prev.filter(item => item.product_id !== productId));

      toast({ title: "تم الحذف", description: "تمت إزالة المنتج من المفضلة" });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إزالة المنتج من المفضلة",
        variant: "destructive",
      });
    }
  };

  const toggleFavorite = async (productId: string) => {
    if (isFavorite(productId)) {
      await removeFromFavorites(productId);
    } else {
      await addToFavorites(productId);
    }
  };

  const isFavorite = (productId: string) => {
    return favoriteItems.some(item => item.product_id === productId);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const favorites = favoriteItems.map(item => item.product_id);
  const favoriteCount = favoriteItems.length;

  return (
    <FavoritesContext.Provider value={{
      favorites,
      favoriteItems,
      favoriteCount,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
      loading
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
