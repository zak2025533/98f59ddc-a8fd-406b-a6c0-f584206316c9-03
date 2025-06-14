
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Percent, Tag, Megaphone, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Announcement {
  id: string;
  title: string;
  description: string | null;
  type: string;
  product_id: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  image_url: string | null;
  is_active: boolean;
  start_date: string | null;
  end_date: string | null;
  products?: {
    name: string;
    price: number;
  } | null;
}

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    fetchActiveAnnouncements();
    
    // Load dismissed announcements from localStorage
    const dismissed = localStorage.getItem('dismissedAnnouncements');
    if (dismissed) {
      setDismissedAnnouncements(JSON.parse(dismissed));
    }
  }, []);

  const fetchActiveAnnouncements = async () => {
    try {
      const now = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('announcements')
        .select(`
          *,
          products (
            name,
            price
          )
        `)
        .eq('is_active', true)
        .or(`start_date.is.null,start_date.lte.${now}`)
        .or(`end_date.is.null,end_date.gte.${now}`)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const dismissAnnouncement = (announcementId: string) => {
    const newDismissed = [...dismissedAnnouncements, announcementId];
    setDismissedAnnouncements(newDismissed);
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(newDismissed));
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'discount':
        return <Percent className="h-4 w-4" />;
      case 'promotion':
        return <Tag className="h-4 w-4" />;
      case 'news':
        return <Newspaper className="h-4 w-4" />;
      default:
        return <Megaphone className="h-4 w-4" />;
    }
  };

  const getAnnouncementColor = (type: string) => {
    switch (type) {
      case 'discount':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'promotion':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'news':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'discount':
        return 'تخفيض';
      case 'promotion':
        return 'عرض ترويجي';
      case 'news':
        return 'أخبار';
      default:
        return 'إعلان عام';
    }
  };

  const visibleAnnouncements = announcements.filter(
    announcement => !dismissedAnnouncements.includes(announcement.id)
  );

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <Megaphone className="h-6 w-6 text-purple-600 ml-2" />
          <h2 className="text-2xl font-bold text-purple-800 font-arabic">الإعلانات</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleAnnouncements.map((announcement) => (
            <Card key={announcement.id} className={`relative ${getAnnouncementColor(announcement.type)} transition-all duration-300 hover:shadow-lg`}>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 left-2 h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                onClick={() => dismissAnnouncement(announcement.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <CardContent className="p-4 pt-8">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getAnnouncementIcon(announcement.type)}
                    <Badge variant="secondary" className="font-arabic text-xs">
                      {getTypeLabel(announcement.type)}
                    </Badge>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 font-arabic mb-2 text-right">
                  {announcement.title}
                </h3>

                {announcement.description && (
                  <p className="text-sm text-gray-600 font-arabic mb-3 text-right">
                    {announcement.description}
                  </p>
                )}

                {announcement.type === 'discount' && announcement.products && (
                  <div className="bg-white/50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-semibold text-gray-800 font-arabic text-right">
                      المنتج: {announcement.products.name}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-right">
                        {announcement.discount_percentage && (
                          <span className="text-lg font-bold text-red-600">
                            {announcement.discount_percentage}% خصم
                          </span>
                        )}
                        {announcement.discount_amount && (
                          <span className="text-lg font-bold text-red-600">
                            خصم {announcement.discount_amount} ريال
                          </span>
                        )}
                      </div>
                      <div className="text-left">
                        <span className="text-sm text-gray-600 font-arabic">السعر الأصلي: </span>
                        <span className="text-lg font-semibold">{announcement.products.price} ريال</span>
                      </div>
                    </div>
                  </div>
                )}

                {announcement.image_url && (
                  <div className="mt-3">
                    <img
                      src={announcement.image_url}
                      alt={announcement.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
