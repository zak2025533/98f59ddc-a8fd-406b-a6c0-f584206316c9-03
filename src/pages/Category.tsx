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
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (categorySlug) {
      fetchCategoryAndProducts(categorySlug);
    } else {
      // لو بدون سلق نوقف التحميل (لأننا نعرض كل الفئات)
      setLoading(false);
      setCategory(null);
      setProducts([]);
    }
  }, [categorySlug]);

  const fetchCategoryAndProducts = async (slug: string) => {
    setLoading(true);
    try {
      // جلب بيانات الفئة بناءً على السلق
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("id, name, image_url")
        .eq("slug", slug)
        .single();

      if (categoryError) throw categoryError;

      if (categoryData) {
        setCategory(categoryData);

        // جلب المنتجات المرتبطة بالفئة
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("id, name, description, price, image_url, is_featured, in_stock")
          .eq("category_id", categoryData.id)
          .eq("in_stock", true);

        if (productsError) throw productsError;

        setProducts(productsData || []);
      } else {
        setCategory(null);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching category or products:", error);
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

  // إذا ما في سلق، عرض كل الفئات
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

  // إذا جاري التحميل
  if (loading) {
    return <CategoryLoading />;
  }

  // إذا الفئة غير موجودة
  if (!category) {
    return <CategoryNotFound />;
  }

  // عرض المنتجات في الفئة حسب نوع الجهاز (موبايل / سطح مكتب)
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
