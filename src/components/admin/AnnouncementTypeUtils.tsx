
import { Badge } from "@/components/ui/badge";

export const getTypeLabel = (type: string) => {
  const types: { [key: string]: string } = {
    general: "إعلان عام",
    discount: "تخفيض",
    promotion: "عرض ترويجي",
    news: "أخبار",
    event: "إعلان مناسبة"
  };
  return types[type] || type;
};

export const getTypeBadgeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    general: "bg-blue-100 text-blue-800",
    discount: "bg-red-100 text-red-800",
    promotion: "bg-green-100 text-green-800",
    news: "bg-purple-100 text-purple-800",
    event: "bg-orange-100 text-orange-800"
  };
  return colors[type] || "bg-gray-100 text-gray-800";
};

interface AnnouncementTypeBadgeProps {
  type: string;
}

export const AnnouncementTypeBadge = ({ type }: AnnouncementTypeBadgeProps) => {
  return (
    <Badge className={`font-arabic ${getTypeBadgeColor(type)}`}>
      {getTypeLabel(type)}
    </Badge>
  );
};
