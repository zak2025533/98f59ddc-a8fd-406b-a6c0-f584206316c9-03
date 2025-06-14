
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:category_id (
            id,
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء جلب المنتجات",
          variant: "destructive",
        });
        return;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب المنتجات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حذف المنتج",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "تم الحذف",
        description: "تم حذف المنتج بنجاح",
      });

      // Refresh products list
      fetchProducts();
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف المنتج",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    deleteProduct,
    refetch: fetchProducts,
  };
};
