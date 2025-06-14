
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Announcement {
  id: string;
  title: string;
  description: string | null;
  type: string;
  image_url: string | null;
  video_url: string | null;
}

interface EventAnnouncementCardProps {
  event: Announcement;
  getAnnouncementIcon: (type: string) => JSX.Element;
  getTypeLabel: (type: string) => string;
}

const EventAnnouncementCard = ({
  event,
  getAnnouncementIcon,
  getTypeLabel,
}: EventAnnouncementCardProps) => {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-0">
        {event.video_url && (
          <div className="relative">
            <video
              controls
              className="w-full h-48 object-cover rounded-t-lg"
              poster={event.image_url || undefined}
            >
              <source src={event.video_url} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-orange-100 text-orange-800 font-arabic">
              {getTypeLabel(event.type)}
            </Badge>
            {getAnnouncementIcon(event.type)}
          </div>

          <h3 className="text-xl font-bold text-gray-800 font-arabic mb-3 text-right">
            {event.title}
          </h3>

          {event.description && (
            <p className="text-gray-600 font-arabic mb-4 text-right leading-relaxed">
              {event.description}
            </p>
          )}

          {event.image_url && !event.video_url && (
            <div className="mt-3">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventAnnouncementCard;
