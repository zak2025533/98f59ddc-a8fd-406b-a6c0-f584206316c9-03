
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Megaphone, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  LogOut,
  Bell,
  BarChart3,
  Settings
} from "lucide-react";
import ProductManagement from "./ProductManagement";
import AnnouncementsManagement from "./AnnouncementsManagement";
import CategoryManagement from "./CategoryManagement";
import OrdersManagement from "./OrdersManagement";
import AnalyticsSection from "./AnalyticsSection";
import InternalNotificationManager from "./InternalNotificationManager";
import NotificationTester from "./NotificationTester";
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
      const [productsResult, announcementsResult, categoriesResult] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('announcements').select('id', { count: 'exact', head: true }),
        supabase.from('categories').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        products: productsResult.count || 0,
        announcements: announcementsResult.count || 0,
        categories: categoriesResult.count || 0,
        orders: 0, // سيتم تحديثه عند إضافة جدول الطلبات
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
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="text-right">
            <h1 className="text-3xl font-bold text-blue-800 font-arabic">
              لوحة تحكم الإدارة
            </h1>
            <p className="text-blue-600 font-arabic mt-1">
              إدارة شاملة لمتجر بلا حدود للحلويات
            </p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="font-arabic hover:bg-red-50 hover:border-red-200"
          >
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-blue-100 text-sm font-arabic">إجمالي المنتجات</p>
                  <p className="text-3xl font-bold">{stats.products}</p>
                </div>
                <Package className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-orange-100 text-sm font-arabic">الإعلانات النشطة</p>
                  <p className="text-3xl font-bold">{stats.announcements}</p>
                </div>
                <Megaphone className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-green-100 text-sm font-arabic">الأقسام</p>
                  <p className="text-3xl font-bold">{stats.categories}</p>
                </div>
                <Users className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-right">
                  <p className="text-purple-100 text-sm font-arabic">الطلبات</p>
                  <p className="text-3xl font-bold">{stats.orders}</p>
                </div>
                <ShoppingCart className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 bg-white shadow-sm">
            <TabsTrigger value="products" className="font-arabic">
              <Package className="h-4 w-4 ml-2" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="announcements" className="font-arabic">
              <Megaphone className="h-4 w-4 ml-2" />
              الإعلانات
            </TabsTrigger>
            <TabsTrigger value="categories" className="font-arabic">
              <Users className="h-4 w-4 ml-2" />
              الأقسام
            </TabsTrigger>
            <TabsTrigger value="orders" className="font-arabic">
              <ShoppingCart className="h-4 w-4 ml-2" />
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="analytics" className="font-arabic">
              <BarChart3 className="h-4 w-4 ml-2" />
              التحليلات
            </TabsTrigger>
            <TabsTrigger value="notifications" className="font-arabic">
              <Bell className="h-4 w-4 ml-2" />
              الإشعارات
            </TabsTrigger>
            <TabsTrigger value="testing" className="font-arabic">
              <Settings className="h-4 w-4 ml-2" />
              الاختبارات
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

          <TabsContent value="notifications">
            <InternalNotificationManager />
          </TabsContent>

          <TabsContent value="testing">
            <NotificationTester />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
