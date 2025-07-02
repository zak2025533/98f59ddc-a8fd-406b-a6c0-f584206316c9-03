
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useProductReviews } from '@/hooks/useProductReviews';
import ReviewCard from './ReviewCard';
import AddReviewForm from './AddReviewForm';

interface ReviewsSectionProps {
  productId: string;
  productName: string;
}

const ReviewsSection = ({ productId, productName }: ReviewsSectionProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { reviews, stats, loading, addReview } = useProductReviews(productId);

  const handleAddReview = async (customerName: string, rating: number, comment?: string) => {
    console.log('ReviewsSection: Handling add review', { customerName, rating, comment });
    const success = await addReview(customerName, rating, comment);
    if (success) {
      setShowAddForm(false);
    }
    return success;
  };

  const renderRatingBars = () => {
    if (!stats || stats.total_reviews === 0) return null;

    const ratings = [
      { stars: 5, count: stats.five_stars },
      { stars: 4, count: stats.four_stars },
      { stars: 3, count: stats.three_stars },
      { stars: 2, count: stats.two_stars },
      { stars: 1, count: stats.one_star },
    ];

    return (
      <div className="space-y-2">
        {ratings.map(({ stars, count }) => (
          <div key={stars} className="flex items-center space-x-2 space-x-reverse">
            <span className="text-sm font-arabic w-8">{stars}</span>
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{
                  width: `${stats.total_reviews > 0 ? (count / stats.total_reviews) * 100 : 0}%`
                }}
              />
            </div>
            <span className="text-sm text-gray-600 font-arabic w-8">{count}</span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic">تقييمات المنتج</CardTitle>
        </CardHeader>
        <CardContent>
          {stats && stats.total_reviews > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 space-x-reverse mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {stats.average_rating.toFixed(1)}
                  </span>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.round(stats.average_rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 font-arabic">
                  من أصل {stats.total_reviews} تقييم
                </p>
              </div>
              <div>
                {renderRatingBars()}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 font-arabic mb-4">
                لا توجد تقييمات لهذا المنتج بعد
              </p>
              <p className="text-sm text-gray-400 font-arabic">
                كن أول من يقيم هذا المنتج
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Review Button/Form */}
      {!showAddForm ? (
        <Button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 font-arabic"
        >
          إضافة تقييم
        </Button>
      ) : (
        <div>
          <AddReviewForm
            productId={productId}
            onSubmit={handleAddReview}
          />
          <Button
            onClick={() => setShowAddForm(false)}
            variant="outline"
            className="w-full mt-2 font-arabic"
          >
            إلغاء
          </Button>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 font-arabic">
            التقييمات ({reviews.length})
          </h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
