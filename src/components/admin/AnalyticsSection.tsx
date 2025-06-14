
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AnalyticsData {
  totalProducts: number;
  totalCategories: number;
  totalAnnouncements: number;
  featuredProducts: number;
  inStockProducts: number;
  outOfStockProducts: number;
  totalOrders: number;
  totalOrderValue: number;
  averageOrderValue: number;
}

interface AnalyticsSectionProps {
  onStatsUpdate: () => void;
}

const AnalyticsSection = ({ onStatsUpdate }: AnalyticsSectionProps) => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProducts: 0,
    totalCategories: 0,
    totalAnnouncements: 0,
    featuredProducts: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
    totalOrders: 0,
    totalOrderValue: 0,
    averageOrderValue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // جلب إحصائيات المنتجات
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

      if (productsError) {
        console.error('Error fetching products:', productsError);
        return;
      }

      // جلب إحصائيات الأقسام
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('*');

      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        return;
      }

      // جلب إحصائيات الإعلانات
      const { data: announcements, error: announcementsError } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true);

      if (announcementsError) {
        console.error('Error fetching announcements:', announcementsError);
        return;
      }

      // جلب إحصائيات الطلبات
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('total_amount');

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      }

      // حساب الإحصائيات الحقيقية
      const totalProducts = products?.length || 0;
      const totalCategories = categories?.length || 0;
      const totalAnnouncements = announcements?.length || 0;
      const featuredProducts = products?.filter(p => p.is_featured)?.length || 0;
      const inStockProducts = products?.filter(p => p.in_stock)?.length || 0;
      const outOfStockProducts = products?.filter(p => !p.in_stock)?.length || 0;
      
      const totalOrders = orders?.length || 0;
      const totalOrderValue = orders?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0;
      const averageOrderValue = totalOrders > 0 ? totalOrderValue / totalOrders : 0;

      const realAnalytics: AnalyticsData = {
        totalProducts,
        totalCategories,
        totalAnnouncements,
        featuredProducts,
        inStockProducts,
        outOfStockProducts,
        totalOrders,
        totalOrderValue,
        averageOrderValue,
      };
      
      setAnalytics(realAnalytics);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4 sm:p-6">
              <div className="h-16 sm:h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* إحصائيات المنتجات والأقسام */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-blue-600 font-arabic">
              إجمالي المنتجات
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-blue-800 font-arabic">
              {analytics.totalProducts}
            </div>
            <p className="text-xs text-blue-500 font-arabic">
              متوفر: {analytics.inStockProducts} | غير متوفر: {analytics.outOfStockProducts}
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-green-600 font-arabic">
              المنتجات المميزة
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-green-800 font-arabic">
              {analytics.featuredProducts}
            </div>
            <p className="text-xs text-green-500 font-arabic">
              من إجمالي {analytics.totalProducts} منتج
            </p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-yellow-600 font-arabic">
              إجمالي الأقسام
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-yellow-700 font-arabic">
              {analytics.totalCategories}
            </div>
            <p className="text-xs text-yellow-500 font-arabic">قسم رئيسي</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-purple-600 font-arabic">
              الإعلانات النشطة
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-purple-700 font-arabic">
              {analytics.totalAnnouncements}
            </div>
            <p className="text-xs text-purple-500 font-arabic">إعلان نشط</p>
          </CardContent>
        </Card>
      </div>

      {/* إحصائيات الطلبات والمبيعات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-blue-600 font-arabic flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              إجمالي الطلبات
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-blue-800 font-arabic">
              {analytics.totalOrders}
            </div>
            <p className="text-xs text-blue-500 font-arabic">طلب</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-green-600 font-arabic flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              إجمالي المبيعات
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-green-800 font-arabic">
              {analytics.totalOrderValue.toLocaleString()} ريال يمني
            </div>
            <p className="text-xs text-green-500 font-arabic">مبيعات إجمالية</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-purple-600 font-arabic flex items-center gap-2">
              <Star className="h-4 w-4" />
              متوسط قيمة الطلب
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-purple-700 font-arabic">
              {analytics.averageOrderValue.toLocaleString()} ريال يمني
            </div>
            <p className="text-xs text-purple-500 font-arabic">متوسط الطلب</p>
          </CardContent>
        </Card>
      </div>

      {/* رسالة إرشادية إذا لم توجد بيانات */}
      {analytics.totalProducts === 0 && analytics.totalOrders === 0 && (
        <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-white">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="text-4xl">📊</div>
              <h3 className="text-lg font-semibold text-gray-700 font-arabic">
                مرحباً بك في لوحة التحليلات
              </h3>
              <p className="text-gray-600 font-arabic">
                ستظهر هنا التحليلات التفصيلية عند إضافة منتجات وتلقي طلبات
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 font-arabic">
                <span>• أضف منتجات</span>
                <span>• أنشئ إعلانات</span>
                <span>• تلقى طلبات</span>
                <span>• راقب النمو</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsSection;
