
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Download, 
  Users, 
  TrendingUp, 
  Globe,
  MousePointer,
  ExternalLink
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface MedianAppStats {
  totalDownloads: number;
  totalInstalls: number;
  androidUsers: number;
  iosUsers: number;
  webUsers: number;
  todayDownloads: number;
  weeklyDownloads: number;
  monthlyDownloads: number;
}

const MedianAppAnalytics = () => {
  const [stats, setStats] = useState<MedianAppStats>({
    totalDownloads: 0,
    totalInstalls: 0,
    androidUsers: 0,
    iosUsers: 0,
    webUsers: 0,
    todayDownloads: 0,
    weeklyDownloads: 0,
    monthlyDownloads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedianAppStats();
  }, []);

  const fetchMedianAppStats = async () => {
    try {
      setLoading(true);

      // جلب إحصائيات تطبيق Median
      const { data: analytics, error } = await supabase
        .from('visitor_analytics')
        .select('*')
        .or('device_info->>median_action.eq.download_click,device_info->>median_action.eq.install_attempt,device_info->>median_action.eq.app_opened');

      if (error) {
        console.error('Error fetching Median app analytics:', error);
        return;
      }

      // حساب الإحصائيات
      const totalDownloads = analytics?.filter(a => 
        a.device_info?.median_action === 'download_click'
      ).length || 0;

      const totalInstalls = analytics?.filter(a => 
        a.device_info?.median_action === 'install_attempt'
      ).length || 0;

      // حساب المنصات
      const androidUsers = analytics?.filter(a => 
        a.device_info?.platform === 'android'
      ).length || 0;

      const iosUsers = analytics?.filter(a => 
        a.device_info?.platform === 'ios'
      ).length || 0;

      const webUsers = analytics?.filter(a => 
        a.device_info?.platform === 'web'
      ).length || 0;

      // حساب تحميلات اليوم
      const today = new Date().toISOString().split('T')[0];
      const todayDownloads = analytics?.filter(a => 
        a.device_info?.median_action === 'download_click' && 
        a.created_at.startsWith(today)
      ).length || 0;

      // حساب تحميلات الأسبوع
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weeklyDownloads = analytics?.filter(a => 
        a.device_info?.median_action === 'download_click' && 
        new Date(a.created_at) >= weekAgo
      ).length || 0;

      // حساب تحميلات الشهر
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      const monthlyDownloads = analytics?.filter(a => 
        a.device_info?.median_action === 'download_click' && 
        new Date(a.created_at) >= monthAgo
      ).length || 0;

      setStats({
        totalDownloads,
        totalInstalls,
        androidUsers,
        iosUsers,
        webUsers,
        todayDownloads,
        weeklyDownloads,
        monthlyDownloads,
      });
    } catch (error) {
      console.error('Error fetching Median app stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const conversionRate = stats.totalDownloads > 0 ? 
    ((stats.totalInstalls / stats.totalDownloads) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* معلومات التطبيق */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            إحصائيات تطبيق Median
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-gray-600 font-arabic">
            <Badge variant="outline" className="font-arabic">
              Median App
            </Badge>
            <span>Package: co.median.android.epyyqd</span>
            <a 
              href="https://median.co/share/epyyqd#apk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-4 w-4" />
              رابط التحميل
            </a>
          </div>
        </CardContent>
      </Card>

      {/* إحصائيات التحميل والتثبيت */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-green-600 font-arabic">
                  إجمالي التحميلات
                </p>
                <p className="text-2xl font-bold text-green-800 font-arabic">
                  {stats.totalDownloads}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Download className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-blue-600 font-arabic">
                  محاولات التثبيت
                </p>
                <p className="text-2xl font-bold text-blue-800 font-arabic">
                  {stats.totalInstalls}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Smartphone className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-purple-600 font-arabic">
                  معدل التحويل
                </p>
                <p className="text-2xl font-bold text-purple-800 font-arabic">
                  {conversionRate}%
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-orange-600 font-arabic">
                  تحميلات اليوم
                </p>
                <p className="text-2xl font-bold text-orange-800 font-arabic">
                  {stats.todayDownloads}
                </p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <MousePointer className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* إحصائيات المنصات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 font-arabic mb-1">أندرويد</h3>
              <p className="text-2xl font-bold text-green-800 font-arabic">{stats.androidUsers}</p>
              <p className="text-sm text-green-600 font-arabic">مستخدم</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800 font-arabic mb-1">iOS</h3>
              <p className="text-2xl font-bold text-blue-800 font-arabic">{stats.iosUsers}</p>
              <p className="text-sm text-blue-600 font-arabic">مستخدم</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-white">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Globe className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-800 font-arabic mb-1">الويب</h3>
              <p className="text-2xl font-bold text-gray-800 font-arabic">{stats.webUsers}</p>
              <p className="text-sm text-gray-600 font-arabic">مستخدم</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ملخص الأداء */}
      <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
        <CardHeader>
          <CardTitle className="text-right font-arabic text-indigo-800">
            ملخص الأداء الأسبوعي والشهري
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 font-arabic mb-2">تحميلات الأسبوع</p>
              <p className="text-3xl font-bold text-indigo-800 font-arabic">{stats.weeklyDownloads}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 font-arabic mb-2">تحميلات الشهر</p>
              <p className="text-3xl font-bold text-indigo-800 font-arabic">{stats.monthlyDownloads}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedianAppAnalytics;
