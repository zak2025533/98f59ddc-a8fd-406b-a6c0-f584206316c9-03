
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Users, ShoppingCart, TrendingUp, LogOut, BarChart3, ClipboardList, Megaphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CategoryManagement from "./CategoryManagement";
import ProductManagement from "./ProductManagement";
import OrdersManagement from "./OrdersManagement";
import AnalyticsSection from "./AnalyticsSection";
import AnnouncementsManagement from "./AnnouncementsManagement";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 12, // مؤقتاً
    totalRevenue: 32100.25, // مؤقتاً
    totalAnnouncements: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes, announcementsRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact' }),
        supabase.from('categories').select('*', { count: 'exact' }),
        supabase.from('announcements').select('*', { count: 'exact' }),
      ]);

      setStats({
        totalProducts: productsRes.count || 0,
        totalCategories: categoriesRes.count || 0,
        totalOrders: 12, // سيتم ربطها بقاعدة البيانات لاحقاً
        totalRevenue: 32100.25, // سيتم ربطها بقاعدة البيانات لاحقاً
        totalAnnouncements: announcementsRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <div className="border-b bg-white shadow-lg backdrop-blur-sm bg-white/90">
        <div className="flex h-16 items-center px-4 sm:px-6 justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <img 
              src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png" 
              alt="بلا حدود للحلويات" 
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full shadow-md"
            />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-blue-800 font-arabic">
                لوحة تحكم بلا حدود للحلويات
              </h1>
              <p className="text-xs sm:text-sm text-blue-600 font-arabic hidden sm:block">
                إدارة شاملة لمتجرك الإلكتروني
              </p>
            </div>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="font-arabic hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
            size="sm"
          >
            <LogOut className="h-4 w-4 ml-2" />
            <span className="hidden sm:inline">تسجيل الخروج</span>
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* الإحصائيات الرئيسية */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-blue-600 font-arabic">
                إجمالي المنتجات
              </CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-blue-800 font-arabic">
                {stats.totalProducts}
              </div>
              <p className="text-xs text-blue-500 font-arabic">منتج متوفر</p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-white hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-yellow-600 font-arabic">
                إجمالي الأقسام
              </CardTitle>
              <Users className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-yellow-700 font-arabic">
                {stats.totalCategories}
              </div>
              <p className="text-xs text-yellow-500 font-arabic">قسم رئيسي</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-green-600 font-arabic">
                إجمالي الطلبات
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-green-700 font-arabic">
                {stats.totalOrders}
              </div>
              <p className="text-xs text-green-500 font-arabic">طلب هذا الشهر</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-purple-600 font-arabic">
                إجمالي المبيعات
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold text-purple-700 font-arabic">
                {stats.totalRevenue.toLocaleString()} ريال
              </div>
              <p className="text-xs text-purple-500 font-arabic">هذا الشهر</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-orange-600 font-arabic">
                إجمالي الإعلانات
              </CardTitle>
              <Megaphone className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-orange-700 font-arabic">
                {stats.totalAnnouncements}
              </div>
              <p className="text-xs text-orange-500 font-arabic">إعلان منشور</p>
            </CardContent>
          </Card>
        </div>

        {/* التبويبات الرئيسية */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <div className="bg-white p-2 rounded-lg shadow-sm border border-blue-100">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6 bg-blue-50 gap-1">
              <TabsTrigger 
                value="analytics" 
                className="font-arabic text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                <BarChart3 className="h-4 w-4 ml-1 sm:ml-2" />
                <span className="hidden sm:inline">التحليلات</span>
                <span className="sm:hidden">تحليل</span>
              </TabsTrigger>
              <TabsTrigger 
                value="announcements" 
                className="font-arabic text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                <Megaphone className="h-4 w-4 ml-1 sm:ml-2" />
                <span className="hidden sm:inline">الإعلانات</span>
                <span className="sm:hidden">إعلانات</span>
              </TabsTrigger>
              <TabsTrigger 
                value="orders" 
                className="font-arabic text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                <ClipboardList className="h-4 w-4 ml-1 sm:ml-2" />
                <span className="hidden sm:inline">الطلبات</span>
                <span className="sm:hidden">طلبات</span>
              </TabsTrigger>
              <TabsTrigger 
                value="products" 
                className="font-arabic text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                <Package className="h-4 w-4 ml-1 sm:ml-2" />
                <span className="hidden sm:inline">المنتجات</span>
                <span className="sm:hidden">منتجات</span>
              </TabsTrigger>
              <TabsTrigger 
                value="categories" 
                className="font-arabic text-xs sm:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
              >
                <Users className="h-4 w-4 ml-1 sm:ml-2" />
                <span className="hidden sm:inline">الأقسام</span>
                <span className="sm:hidden">أقسام</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsSection onStatsUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <AnnouncementsManagement onStatsUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrdersManagement onStatsUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <ProductManagement onStatsUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryManagement onStatsUpdate={fetchStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
