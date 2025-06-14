
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
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl transition-shadow border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-blue-100 text-sm font-arabic font-medium">المنتجات</p>
                <p className="text-4xl font-bold text-white">{stats.products}</p>
              </div>
              <Package className="h-12 w-12 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl hover:shadow-2xl transition-shadow border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-emerald-100 text-sm font-arabic font-medium">الإعلانات</p>
                <p className="text-4xl font-bold text-white">{stats.announcements}</p>
              </div>
              <Megaphone className="h-12 w-12 text-emerald-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-xl hover:shadow-2xl transition-shadow border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-amber-100 text-sm font-arabic font-medium">الأقسام</p>
                <p className="text-4xl font-bold text-white">{stats.categories}</p>
              </div>
              <Users className="h-12 w-12 text-amber-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl hover:shadow-2xl transition-shadow border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-right">
                <p className="text-purple-100 text-sm font-arabic font-medium">الطلبات</p>
                <p className="text-4xl font-bold text-white">{stats.orders}</p>
              </div>
              <ShoppingCart className="h-12 w-12 text-purple-100" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatsCards;
