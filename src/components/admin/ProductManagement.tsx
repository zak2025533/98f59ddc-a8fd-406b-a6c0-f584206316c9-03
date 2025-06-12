
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ProductDialog from "./ProductDialog";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  subcategory_id: string;
  featured?: boolean;
  stock?: number;
  // New schema fields (will be available after migration)
  category_id?: string;
  is_featured?: boolean;
  in_stock?: boolean;
  categories?: { name: string };
  subcategories?: { name: string };
}

interface ProductManagementProps {
  onStatsUpdate: () => void;
}

const ProductManagement = ({ onStatsUpdate }: ProductManagementProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [productDialog, setProductDialog] = useState<{
    isOpen: boolean;
    product?: Product | null;
  }>({ isOpen: false });

  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // First try the new schema
      let { data, error } = await supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          price,
          image_url,
          category_id,
          subcategory_id,
          is_featured,
          in_stock,
          categories!products_category_id_fkey (name),
          subcategories!products_subcategory_id_fkey (name)
        `)
        .order('name');

      // If new schema fails, fallback to old schema
      if (error && error.message.includes('column') && error.message.includes('does not exist')) {
        console.log('Using old schema, migration might not be applied yet');
        const fallbackResult = await supabase
          .from('products')
          .select(`
            id,
            name,
            description,
            price,
            image_url,
            subcategory_id,
            featured,
            stock,
            subcategories (name, category_id, categories (name))
          `)
          .order('name');
        
        if (fallbackResult.error) throw fallbackResult.error;
        
        // Transform old schema to new format
        data = fallbackResult.data?.map(product => ({
          ...product,
          is_featured: product.featured || false,
          in_stock: (product.stock || 0) > 0,
          category_id: product.subcategories?.category_id || '',
          categories: product.subcategories?.categories,
        })) || [];
      } else if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "خطأ",
        description: "تعذر جلب المنتجات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({ title: "تم الحذف", description: "تم حذف المنتج بنجاح" });
      fetchProducts();
      onStatsUpdate();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "تعذر حذف المنتج",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-arabic text-blue-800">إدارة المنتجات</CardTitle>
          <Button 
            onClick={() => setProductDialog({ isOpen: true })}
            className="bg-blue-600 hover:bg-blue-700 font-arabic"
          >
            <Plus className="h-4 w-4 ml-2" />
            إضافة منتج جديد
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="البحث في المنتجات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-arabic"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-pulse text-muted-foreground font-arabic">جاري التحميل...</div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-lg font-arabic">لا توجد منتجات</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="border-blue-100 overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {(product.is_featured || product.featured) && (
                      <Badge className="bg-yellow-500 text-yellow-900">
                        <Star className="h-3 w-3 ml-1" />
                        مميز
                      </Badge>
                    )}
                    <Badge variant={(product.in_stock ?? ((product.stock || 0) > 0)) ? "secondary" : "destructive"}>
                      {(product.in_stock ?? ((product.stock || 0) > 0)) ? "متوفر" : "غير متوفر"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-blue-800 mb-2 font-arabic">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2 font-arabic">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xl font-bold text-blue-800 font-arabic">{product.price} ريال</span>
                    <div className="text-sm text-muted-foreground">
                      <div className="font-arabic">{product.categories?.name}</div>
                      {product.subcategories && (
                        <div className="text-xs font-arabic">{product.subcategories.name}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setProductDialog({ isOpen: true, product })}
                      className="flex-1 font-arabic"
                    >
                      <Edit className="h-4 w-4 ml-1" />
                      تعديل
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>

      <ProductDialog
        isOpen={productDialog.isOpen}
        onClose={() => setProductDialog({ isOpen: false })}
        product={productDialog.product}
        onSuccess={() => {
          fetchProducts();
          onStatsUpdate();
        }}
      />
    </Card>
  );
};

export default ProductManagement;
