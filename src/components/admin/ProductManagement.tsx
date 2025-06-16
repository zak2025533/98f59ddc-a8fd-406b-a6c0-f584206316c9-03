
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, Plus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import ProductDialog from "./ProductDialog";

interface ProductManagementProps {
  onStatsUpdate: () => void;
}

const ProductManagement = ({ onStatsUpdate }: ProductManagementProps) => {
  const { products, loading, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categories?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDialogSuccess = () => {
    console.log("Product dialog success called");
    
    // تحديث الإحصائيات
    onStatsUpdate();
    
    // إغلاق النافذة
    setDialogOpen(false);
    
    // إعادة تعيين المنتج المحرر
    setEditingProduct(null);
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
      <Card className="bg-white border-2 border-gray-300">
        <CardHeader className="pb-3">
          <CardTitle className="font-arabic text-right text-gray-800">إدارة المنتجات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-white border-2 border-gray-300">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <CardTitle className="font-arabic text-right flex items-center gap-2 text-gray-800">
              <Package className="h-5 w-5" />
              إدارة المنتجات ({products.length})
            </CardTitle>
            <Button onClick={openNewDialog} className="font-arabic w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 ml-2" />
              إضافة منتج جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 h-4 w-4" />
            <Input
              placeholder="البحث في المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 font-arabic text-right border-2 border-gray-300 focus:border-blue-500 text-gray-800"
            />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-6">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 font-arabic">
                {searchTerm ? "لا توجد منتجات تطابق البحث" : "لا توجد منتجات حتى الآن"}
              </p>
              <Button onClick={openNewDialog} className="mt-3 font-arabic bg-blue-600 hover:bg-blue-700 text-white">
                إضافة أول منتج
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredProducts.map((product) => (
                <div key={product.id} className="border-2 border-gray-300 rounded-lg p-3 space-y-2 bg-white">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold font-arabic text-right text-gray-800 text-sm">{product.name}</h3>
                    <p className="text-xs text-gray-600 font-arabic text-right">
                      {product.categories?.name}
                    </p>
                    <p className="text-base font-bold text-blue-700 font-arabic text-right">
                      {product.price} ريال يمني
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(product)}
                      className="font-arabic flex-1 border-blue-300 text-blue-700 hover:bg-blue-50 text-xs"
                    >
                      تعديل
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="font-arabic flex-1 bg-red-600 hover:bg-red-700 text-white text-xs"
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
