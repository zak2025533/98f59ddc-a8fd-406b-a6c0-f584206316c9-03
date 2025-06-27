
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
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 px-6 rounded-lg shadow-lg">
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
  );
};

export default BannerAnnouncement;
