
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import ProductFormFields from "./ProductFormFields";
import CategorySelectors from "./CategorySelectors";
import ProductToggles from "./ProductToggles";

interface ProductFormProps {
  product?: any;
  onSuccess: (product?: any) => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    subcategory_id: "",
    image_url: "",
    in_stock: true,
    is_featured: false,
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { sendNewProductNotification } = usePushNotifications();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        category_id: product.category_id || "",
        subcategory_id: product.subcategory_id || "",
        image_url: product.image_url || "",
        in_stock: product.in_stock ?? true,
        is_featured: product.is_featured ?? false,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        category_id: "",
        subcategory_id: "",
        image_url: "",
        in_stock: true,
        is_featured: false,
      });
    }
  }, [product]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.category_id) {
      fetchSubcategories(formData.category_id);
    }
  }, [formData.category_id]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', categoryId)
      .order('name');

    if (!error && data) {
      setSubcategories(data);
    }
  };

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.subcategory_id) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category_id: formData.category_id,
        subcategory_id: formData.subcategory_id,
        image_url: formData.image_url,
        in_stock: formData.in_stock,
        is_featured: formData.is_featured,
      };

      let result;
      if (product) {
        const { data, error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id)
          .select('*')
          .single();
        result = { data, error };
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert([productData])
          .select('*')
          .single();
        result = { data, error };
      }

      if (result.error) {
        console.error('Database error:', result.error);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء حفظ المنتج",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "تم بنجاح",
        description: product ? "تم تحديث المنتج بنجاح" : "تم إضافة المنتج بنجاح",
      });

      console.log('Product saved successfully:', result.data);
      
      // إرسال إشعار عند إضافة منتج جديد فقط
      if (!product) {
        await sendNewProductNotification(result.data.name, result.data.price);
      }
      
      const productWithCategory = {
        ...result.data,
        categories: categories.find(cat => cat.id === result.data.category_id)
      };
      
      onSuccess(productWithCategory);
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ غير متوقع",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ProductFormFields 
        formData={formData} 
        onFormDataChange={handleFormDataChange} 
      />
      
      <CategorySelectors 
        formData={formData}
        categories={categories}
        subcategories={subcategories}
        onFormDataChange={handleFormDataChange}
      />

      <ProductToggles 
        formData={formData} 
        onFormDataChange={handleFormDataChange} 
      />

      <div className="flex gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="font-arabic">
          إلغاء
        </Button>
        <Button type="submit" disabled={loading} className="font-arabic">
          {loading ? "جاري الحفظ..." : product ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
