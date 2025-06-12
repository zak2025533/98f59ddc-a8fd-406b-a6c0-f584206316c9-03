
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Users, ShoppingCart, TrendingUp, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CategoryManagement from "./CategoryManagement";
import ProductManagement from "./ProductManagement";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact' }),
        supabase.from('categories').select('*', { count: 'exact' }),
      ]);

      setStats({
        totalProducts: productsRes.count || 0,
        totalCategories: categoriesRes.count || 0,
        totalOrders: 0, // يمكن إضافة جدول الطلبات لاحقاً
        totalRevenue: 0, // يمكن حسابه من الطلبات
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
    <div className="min-h-screen bg-muted/30">
      <div className="border-b bg-white shadow-sm">
        <div className="flex h-16 items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/2d3014b7-1117-47ac-8b34-9b089e9c499f.png" 
              alt="بلا حدود للحلويات" 
              className="h-12 w-12"
            />
            <h1 className="text-2xl font-bold text-blue-800 font-arabic">
              لوحة تحكم بلا حدود للحلويات
            </h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="font-arabic">
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-600 font-arabic">
                إجمالي المنتجات
              </CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{stats.totalProducts}</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600 font-arabic">
                إجمالي الأقسام
              </CardTitle>
              <Users className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">{stats.totalCategories}</div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-600 font-arabic">
                إجمالي الطلبات
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-600 font-arabic">
                إجمالي المبيعات
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700">{stats.totalRevenue} ريال</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-blue-50">
            <TabsTrigger value="products" className="font-arabic data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              إدارة المنتجات
            </TabsTrigger>
            <TabsTrigger value="categories" className="font-arabic data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              إدارة الأقسام
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductManagement onStatsUpdate={fetchStats} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManagement onStatsUpdate={fetchStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
