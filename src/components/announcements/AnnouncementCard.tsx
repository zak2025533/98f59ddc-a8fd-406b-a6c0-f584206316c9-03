
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: string;
  title: string;
  description: string | null;
  type: string;
  product_id: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  image_url: string | null;
  video_url: string | null;
  products?: {
    name: string;
    price: number;
  } | null;
}

interface AnnouncementCardProps {
  announcement: Announcement;
  getAnnouncementIcon: (type: string) => JSX.Element;
  getAnnouncementColor: (type: string) => string;
  getTypeLabel: (type: string) => string;
}

const AnnouncementCard = ({
  announcement,
  getAnnouncementIcon,
  getAnnouncementColor,
  getTypeLabel,
}: AnnouncementCardProps) => {
  return (
    <Card className={`${getAnnouncementColor(announcement.type)} transition-all duration-300 hover:shadow-lg`}>
      <CardContent className="p-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getAnnouncementIcon(announcement.type)}
            <Badge variant="secondary" className="font-arabic text-xs">
              {getTypeLabel(announcement.type)}
            </Badge>
          </div>
        </div>

        <h3 className="text-sm md:text-base font-semibold text-gray-800 font-arabic mb-2 text-right">
          {announcement.title}
        </h3>

        {announcement.description && (
          <p className="text-xs md:text-sm text-gray-600 font-arabic mb-2 text-right">
            {announcement.description}
          </p>
        )}

        {announcement.type === 'discount' && announcement.products && (
          <div className="bg-white/50 rounded-lg p-2 mb-2">
            <p className="text-xs md:text-sm font-semibold text-gray-800 font-arabic text-right">
              المنتج: {announcement.products.name}
            </p>
            <div className="flex items-center justify-between mt-1">
              <div className="text-right">
                {announcement.discount_percentage && (
                  <span className="text-sm md:text-base font-bold text-red-600">
                    {announcement.discount_percentage}% خصم
                  </span>
                )}
                {announcement.discount_amount && (
                  <span className="text-sm md:text-base font-bold text-red-600">
                    خصم {announcement.discount_amount} ريال
                  </span>
                )}
              </div>
              <div className="text-left">
                <span className="text-xs text-gray-600 font-arabic">السعر الأصلي: </span>
                <span className="text-sm md:text-base font-semibold">{announcement.products.price} ريال</span>
              </div>
            </div>
          </div>
        )}

        {announcement.image_url && (
          <div className="mt-2">
            <img
              src={announcement.image_url}
              alt={announcement.title}
              className="w-full h-24 md:h-32 object-cover rounded-lg"
            />
          </div>
        )}

        {announcement.video_url && (
          <div className="mt-2">
            <video
              controls
              className="w-full h-24 md:h-32 object-cover rounded-lg"
              poster={announcement.image_url || undefined}
            >
              <source src={announcement.video_url} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
