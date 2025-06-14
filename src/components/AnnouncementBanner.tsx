import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Percent, Tag, Megaphone, Newspaper, Calendar } from "lucide-react";
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
  video_url: string | null;
  banner_text: string | null;
  is_active: boolean;
  is_banner: boolean | null;
  start_date: string | null;
  end_date: string | null;
  products?: {
    name: string;
    price: number;
  } | null;
}

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [bannerAnnouncements, setBannerAnnouncements] = useState<Announcement[]>([]);
  const [eventAnnouncements, setEventAnnouncements] = useState<Announcement[]>([]);
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const allAnnouncements = data || [];
      const banners = allAnnouncements.filter(a => a.is_banner);
      const events = allAnnouncements.filter(a => a.type === 'event' && !a.is_banner);
      const regular = allAnnouncements.filter(a => !a.is_banner && a.type !== 'event').slice(0, 3);
      
      setBannerAnnouncements(banners);
      setEventAnnouncements(events);
      setAnnouncements(regular);
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
      case 'event':
        return <Calendar className="h-4 w-4" />;
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
      case 'event':
        return 'bg-orange-50 border-orange-200 text-orange-800';
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
      case 'event':
        return 'مناسبة';
      default:
        return 'إعلان عام';
    }
  };

  const visibleAnnouncements = announcements.filter(
    announcement => !dismissedAnnouncements.includes(announcement.id)
  );

  const visibleBanners = bannerAnnouncements.filter(
    banner => !dismissedAnnouncements.includes(banner.id)
  );

  const visibleEvents = eventAnnouncements.filter(
    event => !dismissedAnnouncements.includes(event.id)
  );

  if (visibleAnnouncements.length === 0 && visibleBanners.length === 0 && visibleEvents.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Banner Announcements */}
      {visibleBanners.length > 0 && (
        <div className="space-y-4">
          {visibleBanners.map((banner) => (
            <div key={banner.id} className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 px-6 rounded-lg shadow-lg">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 left-2 h-6 w-6 p-0 text-white/70 hover:text-white hover:bg-white/20"
                onClick={() => dismissAnnouncement(banner.id)}
              >
                <X className="h-4 w-4" />
              </Button>
              
              <div className="container mx-auto">
                {banner.video_url ? (
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div className="flex-1 text-center lg:text-right">
                      <h2 className="text-3xl font-bold font-arabic mb-4">{banner.title}</h2>
                      {banner.banner_text && (
                        <p className="text-xl font-arabic mb-4">{banner.banner_text}</p>
                      )}
                      {banner.description && (
                        <p className="text-lg font-arabic opacity-90">{banner.description}</p>
                      )}
                    </div>
                    <div className="flex-1 max-w-md">
                      <video
                        controls
                        className="w-full h-auto rounded-lg shadow-lg"
                        poster={banner.image_url || undefined}
                      >
                        <source src={banner.video_url} type="video/mp4" />
                        متصفحك لا يدعم تشغيل الفيديو
                      </video>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h2 className="text-3xl font-bold font-arabic mb-4">{banner.title}</h2>
                    {banner.banner_text && (
                      <p className="text-2xl font-arabic mb-4">{banner.banner_text}</p>
                    )}
                    {banner.description && (
                      <p className="text-lg font-arabic opacity-90">{banner.description}</p>
                    )}
                    {banner.image_url && (
                      <div className="mt-6">
                        <img
                          src={banner.image_url}
                          alt={banner.title}
                          className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Event Announcements */}
      {visibleEvents.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-6">
              <Calendar className="h-6 w-6 text-orange-600 ml-2" />
              <h2 className="text-2xl font-bold text-orange-800 font-arabic">إعلانات المناسبات</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleEvents.map((event) => (
                <Card key={event.id} className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 left-2 h-6 w-6 p-0 text-gray-500 hover:text-gray-700 z-10"
                    onClick={() => dismissAnnouncement(event.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
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
                    
                    <div className="p-6 pt-4">
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
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular Announcements */}
      {visibleAnnouncements.length > 0 && (
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

                    {announcement.video_url && (
                      <div className="mt-3">
                        <video
                          controls
                          className="w-full h-32 object-cover rounded-lg"
                          poster={announcement.image_url || undefined}
                        >
                          <source src={announcement.video_url} type="video/mp4" />
                          متصفحك لا يدعم تشغيل الفيديو
                        </video>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementBanner;
