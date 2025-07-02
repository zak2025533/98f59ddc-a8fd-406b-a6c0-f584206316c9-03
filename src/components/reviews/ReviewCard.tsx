
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
  is_verified: boolean;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2 space-x-reverse">
            <h4 className="font-semibold text-gray-900 font-arabic">
              {review.customer_name}
            </h4>
            {review.is_verified && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-arabic">
                مشتري مؤكد
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            {renderStars(review.rating)}
          </div>
        </div>
        
        {review.comment && (
          <p className="text-gray-700 mb-2 font-arabic leading-relaxed">
            {review.comment}
          </p>
        )}
        
        <p className="text-sm text-gray-500 font-arabic">
          {format(new Date(review.created_at), 'dd MMMM yyyy', { locale: ar })}
        </p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
