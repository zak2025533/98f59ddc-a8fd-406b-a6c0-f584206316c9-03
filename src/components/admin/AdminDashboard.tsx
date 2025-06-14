
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, BarChart3, Package, FolderOpen, Megaphone, Bell } from "lucide-react";
import AnalyticsSection from "./AnalyticsSection";
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";
import AnnouncementsManagement from "./AnnouncementsManagement";
import OrdersManagement from "./OrdersManagement";
import NotificationManager from "./NotificationManager";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [statsKey, setStatsKey] = useState(0);

  const handleStatsUpdate = () => {
    setStatsKey(prev => prev + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-800 font-arabic">لوحة التحكم الإدارية</h1>
            <p className="text-blue-600 font-arabic">إدارة شاملة للمتجر والمنتجات</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline" 
            className="font-arabic"
          >
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>

        <Tabs defaultValue="analytics" className="space-y-6" dir="rtl">
          <TabsList className="grid w-full grid-cols-6 bg-blue-100">
            <TabsTrigger value="analytics" className="font-arabic flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              التحليلات
            </TabsTrigger>
            <TabsTrigger value="products" className="font-arabic flex items-center gap-2">
              <Package className="h-4 w-4" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="categories" className="font-arabic flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />
              الأقسام
            </TabsTrigger>
            <TabsTrigger value="announcements" className="font-arabic flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              الإعلانات
            </TabsTrigger>
            <TabsTrigger value="orders" className="font-arabic flex items-center gap-2">
              <Package className="h-4 w-4" />
              الطلبات
            </TabsTrigger>
            <TabsTrigger value="notifications" className="font-arabic flex items-center gap-2">
              <Bell className="h-4 w-4" />
              الإشعارات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <AnalyticsSection key={statsKey} onStatsUpdate={handleStatsUpdate} />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement onStatsUpdate={handleStatsUpdate} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManagement onStatsUpdate={handleStatsUpdate} />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsManagement onStatsUpdate={handleStatsUpdate} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersManagement onStatsUpdate={handleStatsUpdate} />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
