
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Download, Star, Shield, Zap } from 'lucide-react';
import { useMedianAppTracking } from '@/hooks/useMedianAppTracking';

const AppDownloadSection = () => {
  const { trackDownloadClick, getTrackedDownloadUrl, deviceInfo } = useMedianAppTracking();

  const handleDownload = () => {
    trackDownloadClick();
    window.open(getTrackedDownloadUrl(), '_blank');
  };

  const features = [
    {
      icon: Zap,
      title: "أداء سريع",
      description: "تجربة تسوق سلسة وسريعة"
    },
    {
      icon: Star,
      title: "إشعارات العروض",
      description: "احصل على إشعارات فورية بالعروض الجديدة"
    },
    {
      icon: Shield,
      title: "آمن وموثوق",
      description: "تطبيق آمن ومحمي لبياناتك"
    }
  ];

  if (!deviceInfo.canInstall) {
    return null;
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 font-arabic">
            حمّل التطبيق الآن
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4 font-arabic">
            تطبيق بلا حدود للحلويات
          </h2>
          <p className="text-lg text-gray-600 font-arabic max-w-2xl mx-auto">
            احصل على تجربة تسوق مميزة مع تطبيقنا المجاني. تصفح المنتجات، اطلب بسهولة، واحصل على إشعارات العروض الحصرية.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* معلومات التطبيق */}
          <div className="space-y-8">
            <div className="grid gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 font-arabic mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 font-arabic text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="font-bold text-gray-800 font-arabic">
                    متوافق مع {deviceInfo.platform === 'android' ? 'أندرويد' : 'iOS'}
                  </h3>
                  <p className="text-sm text-gray-600 font-arabic">
                    تحميل مجاني وآمن
                  </p>
                </div>
              </div>
              
              <Button
                onClick={handleDownload}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-arabic"
              >
                <Download className="h-5 w-5 ml-2" />
                تحميل التطبيق الآن
              </Button>
              
              <p className="text-xs text-gray-500 font-arabic text-center mt-3">
                مجاني - بدون إعلانات - آمن 100%
              </p>
            </div>
          </div>

          {/* صورة التطبيق */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-blue-800 font-arabic mb-2">
                    بلا حدود للحلويات
                  </h3>
                  <p className="text-blue-600 font-arabic">
                    تطبيق الحلويات الأول في اليمن
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
