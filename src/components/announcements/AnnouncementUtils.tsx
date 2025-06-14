
import { Percent, Tag, Megaphone, Newspaper, Calendar } from "lucide-react";

export const getAnnouncementIcon = (type: string) => {
  switch (type) {
    case 'discount':
      return <Percent className="h-4 w-4" />;
    case 'promotion':
      return <Tag className="h-4 w-4" />;
    case 'news':
      return <Newspaper className="h-4 w-4" />;
    case 'event':
      return <Calendar className="h-4 w-4" />;
    default:
      return <Megaphone className="h-4 w-4" />;
  }
};

export const getAnnouncementColor = (type: string) => {
  switch (type) {
    case 'discount':
      return 'bg-red-50 border-red-200 text-red-800';
    case 'promotion':
      return 'bg-green-50 border-green-200 text-green-800';
    case 'news':
      return 'bg-blue-50 border-blue-200 text-blue-800';
    case 'event':
      return 'bg-orange-50 border-orange-200 text-orange-800';
    default:
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
  }
};

export const getTypeLabel = (type: string) => {
  switch (type) {
    case 'discount':
      return 'تخفيض';
    case 'promotion':
      return 'عرض ترويجي';
    case 'news':
      return 'أخبار';
    case 'event':
      return 'مناسبة';
    default:
      return 'إعلان عام';
  }
};
