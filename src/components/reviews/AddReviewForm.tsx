
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface AddReviewFormProps {
  productId: string;
  onSubmit: (customerName: string, rating: number, comment?: string) => Promise<boolean>;
}

const AddReviewForm = ({ productId, onSubmit }: AddReviewFormProps) => {
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName.trim() || rating === 0) {
      return;
    }

    setIsSubmitting(true);
    console.log('Submitting review:', { customerName: customerName.trim(), rating, comment: comment.trim() });
    
    const success = await onSubmit(customerName.trim(), rating, comment.trim() || undefined);
    
    if (success) {
      setCustomerName('');
      setRating(0);
      setComment('');
      setHoveredRating(0);
    }
    
    setIsSubmitting(false);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <Star
          key={i}
          className={`h-6 w-6 cursor-pointer transition-colors ${
            starValue <= (hoveredRating || rating)
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-300 hover:text-yellow-300'
          }`}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
        />
      );
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="font-arabic">إضافة تقييم جديد</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
              الاسم *
            </label>
            <Input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="اكتب اسمك هنا"
              required
              className="font-arabic text-sweet-gold bg-white border-gray-300 placeholder-gray-500 focus:border-sweet-gold focus:ring-sweet-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
              التقييم *
            </label>
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className="mr-2 text-sm text-gray-600 font-arabic">
                {rating > 0 ? `${rating} من 5 نجوم` : 'اختر التقييم'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-arabic">
              التعليق (اختياري)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="شاركنا رأيك في المنتج..."
              rows={4}
              className="font-arabic text-sweet-gold bg-white border-gray-300 placeholder-gray-500 focus:border-sweet-gold focus:ring-sweet-gold"
            />
          </div>

          <Button
            type="submit"
            disabled={!customerName.trim() || rating === 0 || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 font-arabic"
          >
            {isSubmitting ? 'جاري الإرسال...' : 'إضافة التقييم'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddReviewForm;
