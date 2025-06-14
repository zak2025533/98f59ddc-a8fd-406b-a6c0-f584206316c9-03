
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Download, 
  Smartphone, 
  Globe, 
  TrendingUp, 
  Calendar,
  Eye,
  MousePointer
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

interface VisitorStats {
  totalVisits: number;
  totalDownloads: number;
  totalInstalls: number;
  totalPwaInstalls: number;
  uniqueVisitors: number;
  todayVisits: number;
  weeklyVisits: number;
  monthlyVisits: number;
}

interface DailyStats {
  date: string;
  visits: number;
  downloads: number;
  installs: number;
}

const VisitorAnalytics = () => {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisits: 0,
    totalDownloads: 0,
    totalInstalls: 0,
    totalPwaInstalls: 0,
    uniqueVisitors: 0,
    todayVisits: 0,
    weeklyVisits: 0,
    monthlyVisits: 0,
  });
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitorStats();
  }, []);

  const fetchVisitorStats = async () => {
    try {
      setLoading(true);

      // جلب الإحصائيات العامة
      const { data: analytics, error: analyticsError } = await supabase
        .from('visitor_analytics')
        .select('*');

      if (analyticsError) {
        console.error('Error fetching analytics:', analyticsError);
        return;
      }

      // جلب الإحصائيات اليومية
      const { data: daily, error: dailyError } = await supabase
        .from('daily_visitor_stats')
        .select('*')
        .order('date', { ascending: true })
        .limit(30);

      if (dailyError) {
        console.error('Error fetching daily stats:', dailyError);
        return;
      }

      // حساب الإحصائيات
      const totalVisits = analytics?.filter(a => a.visitor_type === 'visit').length || 0;
      const totalDownloads = analytics?.filter(a => a.visitor_type === 'download').length || 0;
      const totalInstalls = analytics?.filter(a => a.visitor_type === 'install').length || 0;
      const totalPwaInstalls = analytics?.filter(a => a.visitor_type === 'pwa_install').length || 0;
      
      // حساب الزوار الفريدين
      const uniqueSessionIds = new Set(analytics?.map(a => a.session_id) || []);
      const uniqueVisitors = uniqueSessionIds.size;

      // حساب زيارات اليوم
      const today = new Date().toISOString().split('T')[0];
      const todayVisits = analytics?.filter(a => 
        a.visitor_type === 'visit' && 
        a.created_at.startsWith(today)
      ).length || 0;

      // حساب زيارات الأسبوع
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weeklyVisits = analytics?.filter(a => 
        a.visitor_type === 'visit' && 
        new Date(a.created_at) >= weekAgo
      ).length || 0;

      // حساب زيارات الشهر
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      const monthlyVisits = analytics?.filter(a => 
        a.visitor_type === 'visit' && 
        new Date(a.created_at) >= monthAgo
      ).length || 0;

      setStats({
        totalVisits,
        totalDownloads,
        totalInstalls,
        totalPwaInstalls,
        uniqueVisitors,
        todayVisits,
        weeklyVisits,
        monthlyVisits,
      });

      // تحضير بيانات الرسم البياني
      const chartData = daily?.map(d => ({
        date: new Date(d.date).toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' }),
        visits: d.total_visits,
        downloads: d.total_downloads,
        installs: d.total_installs + d.total_pwa_installs,
      })) || [];

      setDailyStats(chartData);
    } catch (error) {
      console.error('Error fetching visitor stats:', error);
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

  const chartConfig = {
    visits: {
      label: "الزيارات",
      color: "#3b82f6",
    },
    downloads: {
      label: "التحميلات",
      color: "#10b981",
    },
    installs: {
      label: "التثبيتات",
      color: "#f59e0b",
    },
  };

  const statsCards = [
    {
      title: "إجمالي الزيارات",
      value: stats.totalVisits,
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "الزوار الفريدين",
      value: stats.uniqueVisitors,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "إجمالي التحميلات",
      value: stats.totalDownloads,
      icon: Download,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "تثبيتات التطبيق",
      value: stats.totalInstalls + stats.totalPwaInstalls,
      icon: Smartphone,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      title: "زيارات اليوم",
      value: stats.todayVisits,
      icon: Calendar,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      title: "زيارات الأسبوع",
      value: stats.weeklyVisits,
      icon: TrendingUp,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      title: "زيارات الشهر",
      value: stats.monthlyVisits,
      icon: Globe,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200"
    },
    {
      title: "PWA تثبيتات",
      value: stats.totalPwaInstalls,
      icon: MousePointer,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  ];

  return (
    <div className="space-y-8">
      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className={`${card.borderColor} ${card.bgColor} hover:shadow-lg transition-all duration-300`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 font-arabic">
                      {card.title}
                    </p>
                    <p className={`text-2xl font-bold ${card.color} font-arabic`}>
                      {card.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${card.color.replace('text-', 'bg-').replace('600', '100')}`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* رسم بياني خطي للزيارات */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              إحصائيات الزيارات اليومية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="visits" 
                    stroke={chartConfig.visits.color}
                    strokeWidth={3}
                    dot={{ fill: chartConfig.visits.color, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* رسم بياني عمودي للتحميلات والتثبيتات */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <CardTitle className="text-right font-arabic text-green-800 flex items-center gap-2">
              <Download className="h-5 w-5" />
              التحميلات والتثبيتات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="downloads" 
                    fill={chartConfig.downloads.color}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="installs" 
                    fill={chartConfig.installs.color}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* ملخص الأداء */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
        <CardHeader>
          <CardTitle className="text-right font-arabic text-purple-800 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            ملخص الأداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <p className="text-2xl font-bold text-blue-600 font-arabic">
                {((stats.totalDownloads / Math.max(stats.totalVisits, 1)) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 font-arabic">معدل التحويل للتحميل</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-600 font-arabic">
                {((stats.totalInstalls + stats.totalPwaInstalls) / Math.max(stats.totalDownloads, 1) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600 font-arabic">معدل التحويل للتثبيت</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-purple-600 font-arabic">
                {(stats.totalVisits / Math.max(stats.uniqueVisitors, 1)).toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 font-arabic">متوسط الزيارات لكل مستخدم</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorAnalytics;
