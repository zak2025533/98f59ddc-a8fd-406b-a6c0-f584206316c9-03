
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "./ImageUpload";

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  onSuccess: (product?: any) => void;
}

const ProductDialog = ({ isOpen, onClose, product, onSuccess }: ProductDialogProps) => {
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
      
      // إرسال البيانات الكاملة للمنتج مع معلومات التصنيف
      const productWithCategory = {
        ...result.data,
        categories: categories.find(cat => cat.id === result.data.category_id)
      };
      
      onSuccess(productWithCategory);
      onClose();
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-arabic text-right">
            {product ? "تعديل المنتج" : "إضافة منتج جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="font-arabic">اسم المنتج *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="font-arabic text-right"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="font-arabic">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="font-arabic text-right"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="price" className="font-arabic">السعر (ر.س) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="font-arabic text-right"
              required
            />
          </div>

          <div>
            <Label htmlFor="category" className="font-arabic">التصنيف *</Label>
            <Select 
              value={formData.category_id} 
              onValueChange={(value) => setFormData({ ...formData, category_id: value, subcategory_id: "" })}
            >
              <SelectTrigger className="font-arabic text-right">
                <SelectValue placeholder="اختر التصنيف" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="font-arabic text-right">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.category_id && (
            <div>
              <Label htmlFor="subcategory" className="font-arabic">التصنيف الفرعي *</Label>
              <Select 
                value={formData.subcategory_id} 
                onValueChange={(value) => setFormData({ ...formData, subcategory_id: value })}
              >
                <SelectTrigger className="font-arabic text-right">
                  <SelectValue placeholder="اختر التصنيف الفرعي" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id} className="font-arabic text-right">
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label className="font-arabic">صورة المنتج</Label>
            <ImageUpload
              currentImageUrl={formData.image_url}
              onImageChange={(url) => setFormData({ ...formData, image_url: url || "" })}
            />
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              id="in_stock"
              checked={formData.in_stock}
              onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked })}
            />
            <Label htmlFor="in_stock" className="font-arabic">متوفر في المخزون</Label>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Switch
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
            <Label htmlFor="is_featured" className="font-arabic">منتج مميز</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="font-arabic">
              إلغاء
            </Button>
            <Button type="submit" disabled={loading} className="font-arabic">
              {loading ? "جاري الحفظ..." : product ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
