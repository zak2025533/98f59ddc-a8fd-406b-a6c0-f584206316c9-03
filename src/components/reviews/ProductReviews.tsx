
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageCircle, Plus } from "lucide-react";
import { useProductReviews } from "@/hooks/useProductReviews";
import ReviewDialog from "./ReviewDialog";
import ReviewsList from "./ReviewsList";
import RatingsSummary from "./RatingsSummary";

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

const ProductReviews = ({ productId, productName }: ProductReviewsProps) => {
  const { reviews, ratingSummary, loading, addReview } = useProductReviews(productId);
  const [showReviewDialog, setShowReviewDialog] = useState(false);

  const handleAddReview = async (reviewData: {
    customer_name: string;
    rating: number;
    comment?: string;
  }) => {
    const success = await addReview({
      ...reviewData,
      product_id: productId,
    });

    if (success) {
      setShowReviewDialog(false);
    }
  };

  if (loading) {
    return (
      <Card className="bg-white border-2 border-gray-200">
        <CardContent className="p-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-white border-2 border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="font-arabic text-right text-gray-800 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              تقييمات المنتج ({reviews.length})
            </CardTitle>
            <Button
              onClick={() => setShowReviewDialog(true)}
              className="font-arabic bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Plus className="h-4 w-4 ml-1" />
              أضف تقييم
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {ratingSummary && (
            <RatingsSummary summary={ratingSummary} />
          )}

          <ReviewsList reviews={reviews} />

          {reviews.length === 0 && (
            <div className="text-center py-8">
              <Star className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 font-arabic mb-4">
                لا توجد تقييمات لهذا المنتج بعد
              </p>
              <Button
                onClick={() => setShowReviewDialog(true)}
                className="font-arabic bg-blue-600 hover:bg-blue-700 text-white"
              >
                كن أول من يقيم هذا المنتج
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ReviewDialog
        isOpen={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
        onSubmit={handleAddReview}
        productName={productName}
      />
    </>
  );
};

export default ProductReviews;
