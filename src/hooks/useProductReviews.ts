
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { getSessionId } from "@/hooks/cart/cartUtils";

interface ProductReview {
  id: string;
  product_id: string;
  session_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  is_verified: boolean;
  is_approved: boolean;
  created_at: string;
}

interface ProductRatingSummary {
  product_id: string;
  total_reviews: number;
  average_rating: number;
  five_stars: number;
  four_stars: number;
  three_stars: number;
  two_stars: number;
  one_star: number;
}

export const useProductReviews = (productId?: string) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [ratingSummary, setRatingSummary] = useState<ProductRatingSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchReviews = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', id)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return;
      }

      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatingSummary = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('product_ratings_summary')
        .select('*')
        .eq('product_id', id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching rating summary:', error);
        return;
      }

      setRatingSummary(data);
    } catch (error) {
      console.error('Error fetching rating summary:', error);
    }
  };

  const addReview = async (reviewData: {
    product_id: string;
    customer_name: string;
    rating: number;
    comment?: string;
  }) => {
    try {
      const sessionId = getSessionId();
      
      const { error } = await supabase
        .from('product_reviews')
        .insert({
          ...reviewData,
          session_id: sessionId,
        });

      if (error) {
        console.error('Error adding review:', error);
        toast({
          title: "خطأ",
          description: "فشل في إضافة التقييم",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "تم إضافة التقييم",
        description: "شكراً لك على تقييمك",
      });

      // إعادة تحميل التقييمات
      if (productId) {
        await fetchReviews(productId);
        await fetchRatingSummary(productId);
      }

      return true;
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة التقييم",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews(productId);
      fetchRatingSummary(productId);
    }
  }, [productId]);

  return {
    reviews,
    ratingSummary,
    loading,
    addReview,
    refetch: () => {
      if (productId) {
        fetchReviews(productId);
        fetchRatingSummary(productId);
      }
    }
  };
};
