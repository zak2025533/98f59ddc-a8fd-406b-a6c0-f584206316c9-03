
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
      sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  };

  const fetchFavorites = async () => {
    try {
      console.log('Loading favorites...');
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

      if (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }
      
      const formattedItems = (data || []).map(item => ({
        id: item.id,
        product_id: item.product_id,
        product: item.products as any
      }));
      
      setFavoriteItems(formattedItems);
      console.log('Favorites loaded:', formattedItems.length);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل المفضلة",
        variant: "destructive",
      });
    }
  };

  const addToFavorites = async (productId: string) => {
    if (!productId) {
      console.error('Product ID is required');
      return;
    }

    if (isFavorite(productId)) {
      console.log('Product already in favorites');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Adding to favorites:', productId);
      const sessionId = getSessionId();
      const { error } = await supabase
        .from('favorites')
        .insert({
          session_id: sessionId,
          product_id: productId
        });

      if (error) throw error;
      await fetchFavorites();
      
      toast({
        title: "تم إضافة المنتج للمفضلة",
        description: "تم إضافة المنتج إلى قائمة المفضلة بنجاح",
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "خطأ",
        description: "فشل في إضافة المنتج للمفضلة",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!productId) {
      console.error('Product ID is required');
      return;
    }

    try {
      console.log('Removing from favorites:', productId);
      const sessionId = getSessionId();
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('session_id', sessionId)
        .eq('product_id', productId);

      if (error) throw error;
      setFavoriteItems(prev => prev.filter(item => item.product_id !== productId));
      
      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج من قائمة المفضلة",
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف المنتج من المفضلة",
        variant: "destructive",
      });
    }
  };

  const toggleFavorite = async (productId: string) => {
    if (!productId) {
      console.error('Product ID is required');
      return;
    }

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
