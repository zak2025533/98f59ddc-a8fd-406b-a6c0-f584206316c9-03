
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
  is_approved: boolean;
  is_verified: boolean;
}

interface ReviewsStats {
  average_rating: number;
  total_reviews: number;
  five_stars: number;
  four_stars: number;
  three_stars: number;
  two_stars: number;
  one_star: number;
}

export const useProductReviews = (productId: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      // Fetch approved reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      // Fetch ratings summary
      const { data: statsData, error: statsError } = await supabase
        .from('product_ratings_summary')
        .select('*')
        .eq('product_id', productId)
        .single();

      if (statsError && statsError.code !== 'PGRST116') {
        console.error('Error fetching stats:', statsError);
      }

      setReviews(reviewsData || []);
      setStats(statsData || null);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "خطأ في تحميل التقييمات",
        description: "حدث خطأ أثناء تحميل التقييمات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (customerName: string, rating: number, comment?: string) => {
    try {
      // Get or generate session ID
      let sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('session_id', sessionId);
      }

      const { error } = await supabase
        .from('product_reviews')
        .insert({
          product_id: productId,
          customer_name: customerName,
          rating,
          comment: comment || null,
          session_id: sessionId,
        });

      if (error) throw error;

      toast({
        title: "تم إضافة التقييم",
        description: "شكراً لك! سيتم مراجعة تقييمك قبل النشر",
      });

      // Refresh reviews
      fetchReviews();
      return true;
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: "خطأ في إضافة التقييم",
        description: "حدث خطأ أثناء إضافة التقييم، يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  return {
    reviews,
    stats,
    loading,
    addReview,
    refetch: fetchReviews,
  };
};
