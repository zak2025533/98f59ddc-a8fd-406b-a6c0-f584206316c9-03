import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

interface ReviewFormProps {
  productId: string;
}

const ReviewForm = ({ productId }: ReviewFormProps) => {
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const session_id = localStorage.getItem("session_id") || crypto.randomUUID();
    localStorage.setItem("session_id", session_id);

    const { error } = await supabase.from("product_reviews").insert({
      product_id: productId,
      session_id,
      customer_name: customerName,
      rating,
      comment,
      is_verified: false,
      is_approved: false,
    });

    setSubmitting(false);
    if (!error) {
      setSubmitted(true);
      setCustomerName("");
      setRating(0);
      setComment("");
    } else {
      alert("حدث خطأ أثناء الإرسال");
      console.error(error);
    }
  };

  return submitted ? (
    <div className="text-green-600 font-arabic">شكراً لتقييمك! سيتم مراجعته قريباً.</div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4 font-arabic">
      <Input
        type="text"
        placeholder="الاسم (اختياري)"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <div className="flex space-x-reverse space-x-1">
        {[1, 2, 3, 4, 5].map((num) => (
          <Star
            key={num}
            onClick={() => setRating(num)}
            className={`h-6 w-6 cursor-pointer ${rating >= num ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
          />
        ))}
      </div>
      <Textarea
        placeholder="اكتب تعليقك هنا"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button type="submit" disabled={submitting || rating === 0} className="bg-blue-600 hover:bg-blue-700 text-white">
        {submitting ? "جارٍ الإرسال..." : "إرسال التقييم"}
      </Button>
    </form>
  );
};

export default ReviewForm;
