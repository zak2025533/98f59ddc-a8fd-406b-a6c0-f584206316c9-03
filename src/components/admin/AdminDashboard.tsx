
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Megaphone, 
  ShoppingCart, 
  Users, 
  LogOut,
  BarChart3,
  Eye,
  Smartphone
} from "lucide-react";
import ProductManagement from "./ProductManagement";
import AnnouncementsManagement from "./AnnouncementsManagement";
import CategoryManagement from "./CategoryManagement";
import OrdersManagement from "./OrdersManagement";
import AnalyticsSection from "./AnalyticsSection";
import VisitorAnalytics from "./VisitorAnalytics";
import MedianAppAnalytics from "./MedianAppAnalytics";
import { supabase } from "@/integrations/supabase/client";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [stats, setStats] = useState({
    products: 0,
    announcements: 0,
    categories: 0,
    orders: 0,
  });

  const updateStats = async () => {
    try {
      const [productsResult, announcementsResult, categoriesResult, ordersResult] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('announcements').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        products: productsResult.count || 0,
        announcements: announcementsResult.count || 0,
        categories: categoriesResult.count || 0,
        orders: ordersResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    updateStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto p-2 sm:p-4 max-w-7xl">
        {/* Header - محسّن للموبايل */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8 bg-white rounded-lg shadow-sm p-4 sm:p-6">
          <div className="text-center sm:text-right mb-4 sm:mb-0">
            <h1 className="text-xl sm:text-3xl font-bold text-blue-800 font-arabic">
              لوحة تحكم الإدارة
            </h1>
            <p className="text-sm sm:text-base text-blue-600 font-arabic mt-1">
              إدارة شاملة لمتجر بلا حدود للحلويات
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="font-arabic hover:bg-red-50 hover:border-red-200 w-full sm:w-auto"
          >
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>

        {/* Stats Cards - محسّن للموبايل */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-blue-100 text-xs sm:text-sm font-arabic">المنتجات</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats.products}</p>
                </div>
                <Package className="h-8 w-8 sm:h-12 sm:w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-orange-100 text-xs sm:text-sm font-arabic">الإعلانات</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats.announcements}</p>
                </div>
                <Megaphone className="h-8 w-8 sm:h-12 sm:w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-green-100 text-xs sm:text-sm font-arabic">الأقسام</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats.categories}</p>
                </div>
                <Users className="h-8 w-8 sm:h-12 sm:w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-purple-100 text-xs sm:text-sm font-arabic">الطلبات</p>
                  <p className="text-xl sm:text-3xl font-bold">{stats.orders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 sm:h-12 sm:w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs - محسّن للموبايل */}
        <Tabs defaultValue="products" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-white shadow-sm text-xs sm:text-sm">
            <TabsTrigger value="products" className="font-arabic flex flex-col sm:flex-row items-center p-2">
              <Package className="h-3 w-3 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:ml-2" />
              <span className="hidden sm:inline">المنتجات</span>
              <span className="sm:hidden">منتجات</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="font-arabic flex flex-col sm:flex-row items-center p-2">
              <Megaphone className="h-3 w-3 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:ml-2" />
              <span className="hidden sm:inline">الإعلانات</span>
              <span className="sm:hidden">إعلانات</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="font-arabic flex flex-col sm:flex-row items-center p-2">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:ml-2" />
              <span className="hidden sm:inline">الأقسام</span>
              <span className="sm:hidden">أقسام</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="font-arabic flex flex-col sm:flex-row items-center p-2">
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:ml-2" />
              <span className="hidden sm:inline">الطلبات</span>
              <span className="sm:hidden">طلبات</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-arabic flex flex-col sm:flex-row items-center p-2">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:ml-2" />
              <span className="hidden sm:inline">التحليلات</span>
              <span className="sm:hidden">تحليلات</span>
            </TabsTrigger>
            <TabsTrigger value="visitors" className="font-arabic flex flex-col sm:flex-row items-center p-2">
              <Eye className="h-3 w-3 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:ml-2" />
              <span className="hidden sm:inline">إحصائيات الزوار</span>
              <span className="sm:hidden">زوار</span>
            </TabsTrigger>
            <TabsTrigger value="median-app" className="font-arabic flex flex-col sm:flex-row items-center p-2">
              <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 mb-1 sm:mb-0 sm:ml-2" />
              <span className="hidden sm:inline">تطبيق Median</span>
              <span className="sm:hidden">تطبيق</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManagement onStatsUpdate={updateStats} />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsManagement onStatsUpdate={updateStats} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManagement onStatsUpdate={updateStats} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersManagement onStatsUpdate={updateStats} />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsSection onStatsUpdate={updateStats} />
          </TabsContent>

          <TabsContent value="visitors">
            <VisitorAnalytics />
          </TabsContent>

          <TabsContent value="median-app">
            <MedianAppAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
