
import { Star, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  is_verified: boolean;
  created_at: string;
}

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: ar
      });
    } catch {
      return 'منذ فترة';
    }
  };

  if (reviews.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-arabic text-lg font-semibold text-gray-800">
        التقييمات والآراء
      </h3>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-arabic font-semibold text-gray-800">
                      {review.customer_name}
                    </span>
                    {review.is_verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-arabic">
                        موثق
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-600 font-arabic">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {review.comment && (
              <p className="text-gray-700 font-arabic text-right leading-relaxed">
                {review.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
