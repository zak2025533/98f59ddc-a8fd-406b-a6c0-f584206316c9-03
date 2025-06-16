
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "./AdminHeader";
import AdminStatsCards from "./AdminStatsCards";
import AdminNavTabs from "./AdminNavTabs";
import AdminTabsContent from "./AdminTabsContent";

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-3 max-w-7xl">
        <AdminHeader onLogout={onLogout} />
        <AdminStatsCards stats={stats} />

        <Card className="bg-white border-2 border-gray-300">
          <CardContent className="p-0">
            <Tabs defaultValue="products" className="w-full">
              <AdminNavTabs />
              <AdminTabsContent onStatsUpdate={updateStats} />
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
