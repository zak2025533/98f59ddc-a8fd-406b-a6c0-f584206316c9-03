
interface Announcement {
  id: string;
  title: string;
  description: string | null;
  banner_text: string | null;
  image_url: string | null;
  video_url: string | null;
}

interface BannerAnnouncementProps {
  banner: Announcement;
}

const BannerAnnouncement = ({ banner }: BannerAnnouncementProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-4 rounded-lg shadow-lg">
      <div className="container mx-auto">
        {banner.video_url ? (
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="flex-1 text-center lg:text-right">
              <h2 className="text-lg md:text-2xl font-bold font-arabic mb-2">{banner.title}</h2>
              {banner.banner_text && (
                <p className="text-base md:text-lg font-arabic mb-2">{banner.banner_text}</p>
              )}
              {banner.description && (
                <p className="text-sm md:text-base font-arabic opacity-90">{banner.description}</p>
              )}
            </div>
            <div className="flex-1 max-w-sm">
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
            <h2 className="text-lg md:text-2xl font-bold font-arabic mb-2">{banner.title}</h2>
            {banner.banner_text && (
              <p className="text-base md:text-lg font-arabic mb-2">{banner.banner_text}</p>
            )}
            {banner.description && (
              <p className="text-sm md:text-base font-arabic opacity-90">{banner.description}</p>
            )}
            {banner.image_url && (
              <div className="mt-3">
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="w-full max-w-lg mx-auto h-32 md:h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerAnnouncement;
