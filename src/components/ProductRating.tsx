
import { Star } from "lucide-react";
import { useProductReviews } from '@/hooks/useProductReviews';

interface ProductRatingProps {
  productId: string;
  showCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const ProductRating = ({ productId, showCount = true, size = 'md' }: ProductRatingProps) => {
  const { stats, loading } = useProductReviews(productId);

  if (loading) {
    return (
      <div className="flex items-center space-x-1">
        <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
      </div>
    );
  }

  if (!stats || stats.total_reviews === 0) {
    return (
      <div className="flex items-center space-x-1">
        <Star className={`text-gray-300 fill-gray-300 ${
          size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
        }`} />
        <span className={`text-gray-500 font-arabic ${
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
        }`}>
          لا توجد تقييمات
        </span>
      </div>
    );
  }

  const rating = stats.average_rating;
  const count = stats.total_reviews;

  return (
    <div className="flex items-center space-x-1">
      <Star className={`text-yellow-400 fill-yellow-400 ${
        size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
      }`} />
      <span className={`text-gray-700 font-arabic ${
        size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
      }`}>
        {rating.toFixed(1)}
        {showCount && ` (${count})`}
      </span>
    </div>
  );
};

export default ProductRating;
