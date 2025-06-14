
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Smartphone, X, ExternalLink } from 'lucide-react';
import { useMedianAppTracking } from '@/hooks/useMedianAppTracking';

const MedianAppBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { trackDownloadClick, getTrackedDownloadUrl, deviceInfo } = useMedianAppTracking();

  useEffect(() => {
    // التحقق من إمكانية عرض البانر
    const dismissed = localStorage.getItem('median_app_banner_dismissed');
    if (!dismissed && deviceInfo.canInstall) {
      setTimeout(() => setIsVisible(true), 2000); // عرض البانر بعد ثانيتين
    }
  }, [deviceInfo.canInstall]);

  const handleDownload = () => {
    trackDownloadClick();
    window.open(getTrackedDownloadUrl(), '_blank');
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem('median_app_banner_dismissed', 'true');
  };

  if (!isVisible || isDismissed || !deviceInfo.canInstall) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 bg-blue-100 rounded-full">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 font-arabic text-sm">
                    حمّل تطبيق بلا حدود للحلويات
                  </h3>
                  <Badge variant="secondary" className="text-xs font-arabic">
                    مجاني
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 font-arabic">
                  احصل على تجربة تسوق أفضل وإشعارات العروض
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                onClick={handleDownload}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white font-arabic text-xs"
              >
                <Download className="h-4 w-4 ml-1" />
                تحميل
              </Button>
              <Button
                onClick={handleDismiss}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedianAppBanner;
