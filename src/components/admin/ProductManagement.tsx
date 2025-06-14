
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, Plus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useInternalNotifications } from "@/hooks/useInternalNotifications";
import ProductDialog from "./ProductDialog";

interface ProductManagementProps {
  onStatsUpdate: () => void;
}

const ProductManagement = ({ onStatsUpdate }: ProductManagementProps) => {
  const { products, loading, deleteProduct } = useProducts();
  const { sendNotificationForProduct } = useInternalNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categories?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDialogSuccess = (productData?: any) => {
    console.log("Product dialog success called with:", productData);
    
    // تحديث الإحصائيات
    onStatsUpdate();
    
    // إغلاق النافذة
    setDialogOpen(false);
    
    // إرسال إشعار للمنتج الجديد فقط (وليس عند التعديل)
    if (productData && !editingProduct) {
      console.log("Sending notification for new product:", productData);
      
      // إرسال الإشعار الداخلي
      sendNotificationForProduct(productData);
      
      // إرسال إشعار push notification أيضاً
      sendPushNotification(productData);
    }
    
    // إعادة تعيين المنتج المحرر
    setEditingProduct(null);
  };

  const sendPushNotification = async (product: any) => {
    try {
      console.log('Sending push notification for product:', product);
      
      const response = await fetch(`https://xwajnjrojryebgcesebe.supabase.co/functions/v1/send-push-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3YWpuanJvanJ5ZWJnY2VzZWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODUxNzMsImV4cCI6MjA2NTA2MTE3M30.iPHCrdtwFHQyI1ZdZtb_mZ3YZ7UondFUN7UsgODsRLM`
        },
        body: JSON.stringify({
          title: 'منتج جديد!',
          body: `تم إضافة منتج جديد: ${product.name}`,
          type: 'product',
          related_id: product.id,
          icon: '/favicon.ico',
          data: {
            product_id: product.id,
            product_name: product.name
          }
        })
      });

      if (!response.ok) {
        console.error('Failed to send push notification:', await response.text());
      } else {
        console.log('Push notification sent successfully');
      }
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };

  const handleDelete = async (id: string) => {
    const success = await deleteProduct(id);
    if (success) {
      onStatsUpdate();
    }
  };

  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-arabic text-right">إدارة المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-arabic text-right flex items-center gap-2">
              <Package className="h-5 w-5" />
              إدارة المنتجات ({products.length})
            </CardTitle>
            <Button onClick={openNewDialog} className="font-arabic">
              <Plus className="h-4 w-4 ml-2" />
              إضافة منتج جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 font-arabic text-right"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-arabic">
                {searchTerm ? "لا توجد منتجات تطابق البحث" : "لا توجد منتجات حتى الآن"}
              </p>
              <Button onClick={openNewDialog} className="mt-4 font-arabic">
                إضافة أول منتج
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 space-y-3">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold font-arabic text-right">{product.name}</h3>
                    <p className="text-sm text-gray-600 font-arabic text-right">
                      {product.categories?.name}
                    </p>
                    <p className="text-lg font-bold text-blue-600 font-arabic text-right">
                      {product.price} ر.س
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                      className="font-arabic"
                    >
                      تعديل
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="font-arabic"
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ProductDialog
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        onSuccess={handleDialogSuccess}
      />
    </>
  );
};

export default ProductManagement;
