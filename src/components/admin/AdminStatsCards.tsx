
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
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-gray-600 text-sm font-arabic font-medium">المنتجات</p>
                <p className="text-3xl font-bold text-blue-600">{stats.products}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-gray-600 text-sm font-arabic font-medium">الإعلانات</p>
                <p className="text-3xl font-bold text-green-600">{stats.announcements}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Megaphone className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-orange-500 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-gray-600 text-sm font-arabic font-medium">الأقسام</p>
                <p className="text-3xl font-bold text-orange-600">{stats.categories}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-gray-600 text-sm font-arabic font-medium">الطلبات</p>
                <p className="text-3xl font-bold text-purple-600">{stats.orders}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
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
