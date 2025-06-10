
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Eye
} from "lucide-react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "كيكة الشوكولاته", category: "كيكات", price: 85, stock: 15, status: "متوفر" },
    { id: 2, name: "شوكولاته بلجيكية", category: "شوكولاته", price: 45, stock: 32, status: "متوفر" },
    { id: 3, name: "عصير المانجو", category: "مشروبات", price: 25, stock: 8, status: "قليل" },
  ]);

  const stats = [
    { title: "إجمالي المنتجات", value: "156", icon: Package, color: "text-blue-600" },
    { title: "الطلبات اليوم", value: "23", icon: ShoppingCart, color: "text-green-600" },
    { title: "العملاء", value: "1,249", icon: Users, color: "text-purple-600" },
    { title: "المبيعات", value: "15,750 ر.س", icon: TrendingUp, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            لوحة التحكم - بلا حدود للحلويات
          </h1>
          <p className="text-muted-foreground">إدارة المنتجات والطلبات</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="categories">الأقسام</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>إدارة المنتجات</CardTitle>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    إضافة منتج جديد
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          📦
                        </div>
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Badge variant={product.stock > 10 ? "default" : "destructive"}>
                          {product.status}
                        </Badge>
                        <span className="font-semibold">{product.price} ر.س</span>
                        <span className="text-sm text-muted-foreground">المخزون: {product.stock}</span>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>إدارة الأقسام</CardTitle>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    إضافة قسم جديد
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["كيكات", "ويفرات وشوكولاته", "مشروبات وعصائر", "حلوى ومليمات"].map((category) => (
                    <div key={category} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{category}</h3>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  <Input defaultValue="بلا حدود للحلويات" />
                </div>
                <div>
                  <label className="text-sm font-medium">وصف المتجر</label>
                  <Input defaultValue="متجر الحلويات الأول في المملكة" />
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
