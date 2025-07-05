
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Megaphone, 
  Users, 
  ShoppingCart, 
  BarChart3,
  Eye,
  Bell,
} from "lucide-react";

const AdminNavTabs = () => {
  return (
    <div className="border-b-2 border-gray-200 bg-gray-50">
      <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
        <div className="flex flex-wrap w-full">
          <TabsTrigger 
            value="products" 
            className="font-arabic flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-blue-700 hover:bg-blue-50 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:border-b-4 data-[state=active]:border-blue-600"
          >
            <Package className="h-5 w-5" />
            المنتجات
          </TabsTrigger>
          <TabsTrigger 
            value="announcements" 
            className="font-arabic flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-green-700 hover:bg-green-50 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:border-b-4 data-[state=active]:border-green-600"
          >
            <Megaphone className="h-5 w-5" />
            الإعلانات
          </TabsTrigger>
          <TabsTrigger 
            value="push-notifications" 
            className="font-arabic flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-red-700 hover:bg-red-50 data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:border-b-4 data-[state=active]:border-red-600"
          >
            <Bell className="h-5 w-5" />
            الإشعارات المباشرة
          </TabsTrigger>
          <TabsTrigger 
            value="categories" 
            className="font-arabic flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-orange-700 hover:bg-orange-50 data-[state=active]:bg-white data-[state=active]:text-orange-700 data-[state=active]:border-b-4 data-[state=active]:border-orange-600"
          >
            <Users className="h-5 w-5" />
            الأقسام
          </TabsTrigger>
          <TabsTrigger 
            value="orders" 
            className="font-arabic flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-purple-700 hover:bg-purple-50 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:border-b-4 data-[state=active]:border-purple-600"
          >
            <ShoppingCart className="h-5 w-5" />
            الطلبات
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="font-arabic flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:border-b-4 data-[state=active]:border-indigo-600"
          >
            <BarChart3 className="h-5 w-5" />
            التحليلات
          </TabsTrigger>
          <TabsTrigger 
            value="visitors" 
            className="font-arabic flex items-center gap-2 px-6 py-4 text-gray-700 hover:text-cyan-700 hover:bg-cyan-50 data-[state=active]:bg-white data-[state=active]:text-cyan-700 data-[state=active]:border-b-4 data-[state=active]:border-cyan-600"
          >
            <Eye className="h-5 w-5" />
            الزوار
          </TabsTrigger>
        </div>
      </TabsList>
    </div>
  );
};

export default AdminNavTabs;
