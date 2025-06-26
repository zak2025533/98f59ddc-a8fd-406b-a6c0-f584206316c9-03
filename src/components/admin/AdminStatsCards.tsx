
import { Card, CardContent } from "@/components/ui/card";
import { Package, Megaphone, Users, ShoppingCart } from "lucide-react";

interface StatsData {
  products: number;
  announcements: number;
  categories: number;
  orders: number;
}

interface AdminStatsCardsProps {
  stats: StatsData;
}

const AdminStatsCards = ({ stats }: AdminStatsCardsProps) => {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="bg-white border-2 border-blue-300">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-blue-700 text-xs font-arabic font-semibold mb-1">المنتجات</p>
                <p className="text-2xl font-bold text-blue-800">{stats.products}</p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-green-300">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-green-700 text-xs font-arabic font-semibold mb-1">الإعلانات</p>
                <p className="text-2xl font-bold text-green-800">{stats.announcements}</p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <Megaphone className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-orange-300">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-orange-700 text-xs font-arabic font-semibold mb-1">الأقسام</p>
                <p className="text-2xl font-bold text-orange-800">{stats.categories}</p>
              </div>
              <div className="bg-orange-500 p-3 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-purple-300">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-purple-700 text-xs font-arabic font-semibold mb-1">الطلبات</p>
                <p className="text-2xl font-bold text-purple-800">{stats.orders}</p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatsCards;
