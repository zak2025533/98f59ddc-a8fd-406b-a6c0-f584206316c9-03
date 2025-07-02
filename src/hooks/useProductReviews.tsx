
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
    if (!productId) return;
    
    try {
      console.log('Fetching reviews for product:', productId);
      
      // Fetch approved reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('product_reviews')
        .select('*')
        .eq('product_id', productId)
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (reviewsError) {
        console.error('Error fetching reviews:', reviewsError);
        // Don't throw error, just log it and continue
      }

      console.log('Reviews data:', reviewsData);

      // Fetch ratings summary
      const { data: statsData, error: statsError } = await supabase
        .from('product_ratings_summary')
        .select('*')
        .eq('product_id', productId)
        .maybeSingle();

      if (statsError && statsError.code !== 'PGRST116') {
        console.error('Error fetching stats:', statsError);
      }

      console.log('Stats data:', statsData);

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
      console.log('Adding review:', { customerName, rating, comment, productId });
      
      // Get or generate session ID
      let sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        localStorage.setItem('session_id', sessionId);
      }

      const reviewData = {
        product_id: productId,
        customer_name: customerName,
        rating,
        comment: comment || null,
        session_id: sessionId,
        is_approved: true, // Auto-approve reviews since no moderation system
        is_verified: false
      };

      console.log('Inserting review data:', reviewData);

      const { data, error } = await supabase
        .from('product_reviews')
        .insert(reviewData)
        .select();

      if (error) {
        console.error('Error adding review:', error);
        throw error;
      }

      console.log('Review added successfully:', data);

      toast({
        title: "تم إضافة التقييم",
        description: "تم إضافة تقييمك بنجاح",
      });

      // Refresh reviews
      await fetchReviews();
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
