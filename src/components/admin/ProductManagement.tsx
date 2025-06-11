import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProductDialog from "./ProductDialog";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  image_url?: string;
  subcategory_id: string;
  subcategories: {
    name: string;
    categories: {
      name: string;
    };
  };
}

interface ProductManagementProps {
  onProductChange: () => void;
}

const ProductManagement = ({ onProductChange }: ProductManagementProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
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
          description,
          image_url,
          subcategory_id,
          subcategories (
            name,
            categories (
              name
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      onProductChange();
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "خطأ",
        description: "تعذر تحميل المنتجات",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف المنتج بنجاح",
      });

      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "خطأ",
        description: "تعذر حذف المنتج",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>إدارة المنتجات</CardTitle>
          <Button onClick={handleAddProduct} className="gap-2">
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
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <img 
                      src="https://images.unsplash.com/photo-1606813903154-6fdcdb8bb93c?auto=format&fit=crop&w=400&q=80" 
                      alt="منتج بدون صورة"
                      className="w-full h-full object-cover rounded-lg opacity-70"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {product.subcategories?.categories?.name} - {product.subcategories?.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Badge variant={product.stock > 10 ? "default" : "destructive"}>
                  {product.stock > 10 ? "متوفر" : "قليل"}
                </Badge>
                <span className="font-semibold">{product.price} ر.س</span>
                <span className="text-sm text-muted-foreground">المخزون: {product.stock}</span>
                <div className="flex space-x-2 space-x-reverse">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد منتجات حالياً. اضغط على "إضافة منتج جديد" للبدء.
            </div>
          )}
        </div>
      </CardContent>

      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        product={editingProduct}
        onSuccess={fetchProducts}
      />
    </Card>
  );
};

export default ProductManagement;
