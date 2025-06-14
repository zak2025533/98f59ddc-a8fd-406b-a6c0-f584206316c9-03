
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
  );
};

export default AdminStatsCards;
