
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Megaphone, Calendar } from "lucide-react";
import BannerAnnouncement from "./announcements/BannerAnnouncement";
import EventAnnouncementCard from "./announcements/EventAnnouncementCard";
import AnnouncementCard from "./announcements/AnnouncementCard";
import { getAnnouncementIcon, getAnnouncementColor, getTypeLabel } from "./announcements/AnnouncementUtils";

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

  useEffect(() => {
    fetchActiveAnnouncements();
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

  if (announcements.length === 0 && bannerAnnouncements.length === 0 && eventAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 py-2">
      {/* Banner Announcements */}
      {bannerAnnouncements.length > 0 && (
        <div className="space-y-2 px-4">
          {bannerAnnouncements.map((banner) => (
            <BannerAnnouncement key={banner.id} banner={banner} />
          ))}
        </div>
      )}

      {/* Event Announcements */}
      {eventAnnouncements.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-3">
              <Calendar className="h-5 w-5 text-orange-600 ml-2" />
              <h2 className="text-lg md:text-xl font-bold text-orange-800 font-arabic">إعلانات المناسبات</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {eventAnnouncements.map((event) => (
                <EventAnnouncementCard
                  key={event.id}
                  event={event}
                  getAnnouncementIcon={getAnnouncementIcon}
                  getTypeLabel={getTypeLabel}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular Announcements */}
      {announcements.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-3">
              <Megaphone className="h-5 w-5 text-purple-600 ml-2" />
              <h2 className="text-lg md:text-xl font-bold text-purple-800 font-arabic">الإعلانات</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  getAnnouncementIcon={getAnnouncementIcon}
                  getAnnouncementColor={getAnnouncementColor}
                  getTypeLabel={getTypeLabel}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementBanner;
