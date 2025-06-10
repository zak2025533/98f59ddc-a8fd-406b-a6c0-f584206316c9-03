
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Eye,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProductManagement from "./ProductManagement";
import CategoryManagement from "./CategoryManagement";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  subcategory_id: string;
  subcategories: {
    name: string;
    categories: {
      name: string;
    };
  };
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalSubcategories: 0,
    lowStockProducts: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          price,
          stock,
          subcategory_id,
          subcategories (
            name,
            categories (
              name
            )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "خطأ",
        description: "تعذر تحميل المنتجات",
        variant: "destructive",
      });
    }
  };

  const fetchStats = async () => {
    try {
      const { data: productsData } = await supabase
        .from('products')
        .select('id, stock');
      
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('id');
      
      const { data: subcategoriesData } = await supabase
        .from('subcategories')
        .select('id');

      setStats({
        totalProducts: productsData?.length || 0,
        totalCategories: categoriesData?.length || 0,
        totalSubcategories: subcategoriesData?.length || 0,
        lowStockProducts: productsData?.filter(p => p.stock < 10).length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    window.location.reload();
  };

  const statsCards = [
    { title: "إجمالي المنتجات", value: stats.totalProducts, icon: Package, color: "text-blue-600" },
    { title: "الأقسام", value: stats.totalCategories, icon: ShoppingCart, color: "text-green-600" },
    { title: "الفئات الفرعية", value: stats.totalSubcategories, icon: Users, color: "text-purple-600" },
    { title: "منتجات قليلة المخزون", value: stats.lowStockProducts, icon: TrendingUp, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              لوحة التحكم - بلا حدود للحلويات
            </h1>
            <p className="text-muted-foreground">إدارة المنتجات والطلبات</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="categories">الأقسام</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <ProductManagement onProductChange={fetchProducts} />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryManagement onCategoryChange={fetchStats} />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إدارة الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  سيتم إضافة إدارة الطلبات قريباً...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المتجر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">اسم المتجر</label>
                  <input 
                    className="w-full mt-1 p-2 border rounded" 
                    defaultValue="بلا حدود للحلويات" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">وصف المتجر</label>
                  <input 
                    className="w-full mt-1 p-2 border rounded" 
                    defaultValue="متجر الحلويات الأول في المملكة" 
                  />
                </div>
                <Button>حفظ الإعدادات</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
