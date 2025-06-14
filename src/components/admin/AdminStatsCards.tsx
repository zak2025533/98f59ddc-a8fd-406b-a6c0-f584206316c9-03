
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
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border border-blue-200 hover:border-blue-300 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-blue-600 text-sm font-arabic font-medium mb-2">المنتجات</p>
                <p className="text-3xl font-bold text-blue-700">{stats.products}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-green-200 hover:border-green-300 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-green-600 text-sm font-arabic font-medium mb-2">الإعلانات</p>
                <p className="text-3xl font-bold text-green-700">{stats.announcements}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <Megaphone className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-orange-200 hover:border-orange-300 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-orange-600 text-sm font-arabic font-medium mb-2">الأقسام</p>
                <p className="text-3xl font-bold text-orange-700">{stats.categories}</p>
              </div>
              <div className="bg-orange-100 p-4 rounded-full">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-purple-200 hover:border-purple-300 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-purple-600 text-sm font-arabic font-medium mb-2">الطلبات</p>
                <p className="text-3xl font-bold text-purple-700">{stats.orders}</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <ShoppingCart className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatsCards;
