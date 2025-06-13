
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  todayRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  popularProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentCustomers: number;
  averageOrderValue: number;
}

interface AnalyticsSectionProps {
  onStatsUpdate: () => void;
}

const AnalyticsSection = ({ onStatsUpdate }: AnalyticsSectionProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    todayRevenue: 0,
    weeklyRevenue: 0,
    monthlyRevenue: 0,
    popularProducts: [],
    recentCustomers: 0,
    averageOrderValue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // مؤقتاً سنقوم بإنشاء بيانات وهمية للتحليلات
      const mockAnalytics: AnalyticsData = {
        todayRevenue: 1250.75,
        weeklyRevenue: 8450.50,
        monthlyRevenue: 32100.25,
        popularProducts: [
          { id: '1', name: 'كيك الشوكولاته الفاخر', sales: 45, revenue: 2250.00 },
          { id: '2', name: 'مشروب القهوة المثلج', sales: 38, revenue: 1140.00 },
          { id: '3', name: 'حلوى التمر والجوز', sales: 32, revenue: 960.00 },
          { id: '4', name: 'عصير الفواكه الطبيعي', sales: 28, revenue: 840.00 },
        ],
        recentCustomers: 156,
        averageOrderValue: 87.50,
      };
      
      setAnalytics(mockAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const revenueCards = [
    {
      title: "مبيعات اليوم",
      value: analytics.todayRevenue,
      icon: DollarSign,
      trend: "+12.5%",
      trendUp: true,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "مبيعات الأسبوع",
      value: analytics.weeklyRevenue,
      icon: TrendingUp,
      trend: "+8.2%",
      trendUp: true,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "مبيعات الشهر",
      value: analytics.monthlyRevenue,
      icon: ShoppingBag,
      trend: "+15.3%",
      trendUp: true,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      title: "العملاء الجدد",
      value: analytics.recentCustomers,
      icon: Users,
      trend: "+22.1%",
      trendUp: true,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      isCount: true
    },
    {
      title: "متوسط قيمة الطلب",
      value: analytics.averageOrderValue,
      icon: Star,
      trend: "+5.7%",
      trendUp: true,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200"
    }
  ];

  return (
    <div className="space-y-8">
      {/* بطاقات الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {revenueCards.map((card, index) => {
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
                      {card.isCount 
                        ? card.value.toLocaleString() 
                        : `${card.value.toLocaleString()} ريال`
                      }
                    </p>
                    <div className="flex items-center gap-1">
                      {card.trendUp ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs font-medium ${card.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                        {card.trend}
                      </span>
                    </div>
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

      {/* المنتجات الأكثر مبيعاً */}
      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="text-right font-arabic text-blue-800 flex items-center gap-2">
            <Star className="h-5 w-5" />
            المنتجات الأكثر مبيعاً
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.popularProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="font-arabic">
                    #{index + 1}
                  </Badge>
                  <div>
                    <h3 className="font-semibold text-blue-800 font-arabic">{product.name}</h3>
                    <p className="text-sm text-gray-600 font-arabic">
                      {product.sales} مبيعة
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="font-bold text-blue-800 font-arabic">
                    {product.revenue.toLocaleString()} ريال
                  </p>
                  <p className="text-sm text-gray-600 font-arabic">
                    إجمالي الإيرادات
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
