
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import MobileLayout from "@/components/mobile/MobileLayout";
import MobileHeader from "@/components/mobile/MobileHeader";
import SimpleNavbar from "@/components/SimpleNavbar";
import SimpleFooter from "@/components/SimpleFooter";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useIsMobile } from "@/hooks/use-mobile";

import CategoryLoading from "@/components/category/CategoryLoading";
import CategoryNotFound from "@/components/category/CategoryNotFound";
import CategoryHeader from "@/components/category/CategoryHeader";
import ProductsGrid from "@/components/category/ProductsGrid";
import AllCategories from "@/components/category/AllCategories";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_featured: boolean;
  in_stock: boolean;
}

interface Category {
  id: string;
  name: string;
  image_url: string;
}

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (categorySlug) {
      fetchCategoryAndProducts();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug]);

  const fetchCategoryAndProducts = async () => {
    setLoading(true);
    try {
      // Fetch category info
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id, name, image_url')
        .eq('slug', categorySlug)
        .single();

      if (categoryError && categoryError.code !== 'PGRST116') {
        throw categoryError;
      }
      
      if (categoryData) {
        setCategory(categoryData);
        // Fetch products in this category
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('id, name, description, price, image_url, is_featured, in_stock')
          .eq('category_id', categoryData.id)
          .eq('in_stock', true);

        if (productsError) throw productsError;
        setProducts(productsData || []);
      } else {
        setCategory(null);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
      setCategory(null);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    if (isFavorite(productId)) {
      removeFromFavorites(productId);
    } else {
      addToFavorites(productId);
    }
  };

  if (!categorySlug) {
    if (isMobile) {
      return (
        <MobileLayout>
          <MobileHeader title="جميع الأقسام" />
          <AllCategories />
          <SimpleFooter />
        </MobileLayout>
      );
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
        <SimpleNavbar />
        <AllCategories />
        <SimpleFooter />
      </div>
    );
  }

  if (loading) {
    return <CategoryLoading />;
  }

  if (!category) {
    return <CategoryNotFound />;
  }

  if (isMobile) {
    return (
      <MobileLayout>
        <MobileHeader title={category.name} />
        <ProductsGrid
          products={products}
          isFavorite={isFavorite}
          onAddToCart={addToCart}
          onToggleFavorite={handleToggleFavorite}
        />
        <SimpleFooter />
      </MobileLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <SimpleNavbar />
      
      <CategoryHeader name={category.name} />

      <ProductsGrid
        products={products}
        isFavorite={isFavorite}
        onAddToCart={addToCart}
        onToggleFavorite={handleToggleFavorite}
      />

      <SimpleFooter />
    </div>
  );
};

export default CategoryPage;
