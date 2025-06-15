
import { Star } from "lucide-react";

interface RatingsSummaryProps {
  summary: {
    total_reviews: number;
    average_rating: number;
    five_stars: number;
    four_stars: number;
    three_stars: number;
    two_stars: number;
    one_star: number;
  };
}

const RatingsSummary = ({ summary }: RatingsSummaryProps) => {
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

  const renderRatingBar = (count: number, total: number, stars: number) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;
    
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="font-arabic w-8">{stars}</span>
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="font-arabic w-8 text-gray-600">{count}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">
            {summary.average_rating}
          </div>
          <div className="flex justify-center gap-1 mb-1">
            {renderStars(Math.round(summary.average_rating))}
          </div>
          <div className="text-sm text-gray-600 font-arabic">
            ({summary.total_reviews} تقييم)
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {renderRatingBar(summary.five_stars, summary.total_reviews, 5)}
        {renderRatingBar(summary.four_stars, summary.total_reviews, 4)}
        {renderRatingBar(summary.three_stars, summary.total_reviews, 3)}
        {renderRatingBar(summary.two_stars, summary.total_reviews, 2)}
        {renderRatingBar(summary.one_star, summary.total_reviews, 1)}
      </div>
    </div>
  );
};

export default RatingsSummary;
