
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    customer_name: string;
    rating: number;
    comment?: string;
  }) => Promise<void>;
  productName: string;
}

const ReviewDialog = ({ isOpen, onClose, onSubmit, productName }: ReviewDialogProps) => {
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName.trim() || rating === 0) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        customer_name: customerName.trim(),
        rating,
        comment: comment.trim() || undefined,
      });
      
      // Reset form
      setCustomerName("");
      setRating(0);
      setComment("");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= (hoveredRating || rating);
      
      return (
        <button
          key={index}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className="p-1 hover:scale-110 transition-transform"
        >
          <Star
            className={`h-8 w-8 ${
              isFilled 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border-2 border-blue-300">
        <DialogHeader className="bg-blue-50 -mx-6 -mt-6 px-6 py-4 border-b border-blue-200">
          <DialogTitle className="font-arabic text-right text-blue-800">
            تقييم المنتج: {productName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="customerName" className="font-arabic text-gray-800">
              الاسم *
            </Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="font-arabic text-right mt-1 border-gray-300"
              placeholder="اكتب اسمك"
              required
            />
          </div>

          <div>
            <Label className="font-arabic text-gray-800">التقييم *</Label>
            <div className="flex justify-center gap-1 mt-2 p-2 border border-gray-300 rounded-md">
              {renderStars()}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 font-arabic text-center mt-1">
                {rating === 1 && "ضعيف"}
                {rating === 2 && "مقبول"}
                {rating === 3 && "جيد"}
                {rating === 4 && "جيد جداً"}
                {rating === 5 && "ممتاز"}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="comment" className="font-arabic text-gray-800">
              التعليق (اختياري)
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="font-arabic text-right mt-1 border-gray-300"
              placeholder="شاركنا رأيك في المنتج..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="font-arabic flex-1"
              disabled={loading}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              className="font-arabic flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={loading || !customerName.trim() || rating === 0}
            >
              {loading ? "جار الإرسال..." : "إرسال التقييم"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
