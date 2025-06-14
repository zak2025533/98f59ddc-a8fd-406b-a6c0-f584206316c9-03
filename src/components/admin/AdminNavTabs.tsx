
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Megaphone, 
  Users, 
  ShoppingCart, 
  BarChart3,
  Eye,
  Smartphone
} from "lucide-react";

const AdminNavTabs = () => {
  return (
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
  );
};

export default AdminNavTabs;
