
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
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <Card className="bg-white shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                <div className="text-center lg:text-right">
                  <h1 className="text-2xl lg:text-3xl font-bold text-blue-800 font-arabic">
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
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-blue-100 text-sm font-arabic">المنتجات</p>
                    <p className="text-3xl font-bold">{stats.products}</p>
                  </div>
                  <Package className="h-12 w-12 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <p className="text-orange-100 text-sm font-arabic">الإعلانات</p>
                    <p className="text-3xl font-bold">{stats.announcements}</p>
                  </div>
                  <Megaphone className="h-12 w-12 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
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

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
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
        </div>

        {/* Main Content Tabs */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <Tabs defaultValue="products" className="w-full">
              <div className="border-b bg-gray-50">
                <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
                  <div className="flex flex-wrap w-full">
                    <TabsTrigger 
                      value="products" 
                      className="font-arabic flex items-center gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                      <Package className="h-4 w-4" />
                      المنتجات
                    </TabsTrigger>
                    <TabsTrigger 
                      value="announcements" 
                      className="font-arabic flex items-center gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                      <Megaphone className="h-4 w-4" />
                      الإعلانات
                    </TabsTrigger>
                    <TabsTrigger 
                      value="categories" 
                      className="font-arabic flex items-center gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                      <Users className="h-4 w-4" />
                      الأقسام
                    </TabsTrigger>
                    <TabsTrigger 
                      value="orders" 
                      className="font-arabic flex items-center gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      الطلبات
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analytics" 
                      className="font-arabic flex items-center gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                      <BarChart3 className="h-4 w-4" />
                      التحليلات
                    </TabsTrigger>
                    <TabsTrigger 
                      value="visitors" 
                      className="font-arabic flex items-center gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                      <Eye className="h-4 w-4" />
                      الزوار
                    </TabsTrigger>
                    <TabsTrigger 
                      value="median-app" 
                      className="font-arabic flex items-center gap-2 px-4 py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
                    >
                      <Smartphone className="h-4 w-4" />
                      التطبيق
                    </TabsTrigger>
                  </div>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="products" className="m-0">
                  <ProductManagement onStatsUpdate={updateStats} />
                </TabsContent>

                <TabsContent value="announcements" className="m-0">
                  <AnnouncementsManagement onStatsUpdate={updateStats} />
                </TabsContent>

                <TabsContent value="categories" className="m-0">
                  <CategoryManagement onStatsUpdate={updateStats} />
                </TabsContent>

                <TabsContent value="orders" className="m-0">
                  <OrdersManagement onStatsUpdate={updateStats} />
                </TabsContent>

                <TabsContent value="analytics" className="m-0">
                  <AnalyticsSection onStatsUpdate={updateStats} />
                </TabsContent>

                <TabsContent value="visitors" className="m-0">
                  <VisitorAnalytics />
                </TabsContent>

                <TabsContent value="median-app" className="m-0">
                  <MedianAppAnalytics />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
