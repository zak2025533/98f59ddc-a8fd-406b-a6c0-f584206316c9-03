
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "./ImageUpload";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  subcategory_id: string;
  is_featured: boolean;
  in_stock: boolean;
}

interface Category {
  id: string;
  name: string;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSuccess: () => void;
}

const ProductDialog = ({ isOpen, onClose, product, onSuccess }: ProductDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image_url: "",
    category_id: "",
    subcategory_id: "",
    is_featured: false,
    in_stock: true,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          image_url: product.image_url,
          category_id: product.category_id,
          subcategory_id: product.subcategory_id || "",
          is_featured: product.is_featured,
          in_stock: product.in_stock,
        });
      } else {
        setFormData({
          name: "",
          description: "",
          price: 0,
          image_url: "",
          category_id: "",
          subcategory_id: "",
          is_featured: false,
          in_stock: true,
        });
      }
    }
  }, [isOpen, product]);

  useEffect(() => {
    if (formData.category_id) {
      fetchSubcategories(formData.category_id);
    } else {
      setSubcategories([]);
    }
  }, [formData.category_id]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId: string) => {
    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('id, name, category_id')
        .eq('category_id', categoryId)
        .order('name');

      if (error) throw error;
      setSubcategories(data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.description.trim() || !formData.category_id) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    if (formData.price <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال سعر صحيح",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: formData.price,
        image_url: formData.image_url || null,
        category_id: formData.category_id,
        subcategory_id: formData.subcategory_id || null,
        is_featured: formData.is_featured,
        in_stock: formData.in_stock,
      };

      if (product) {
        // تحديث
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        toast({ title: "تم التحديث", description: "تم تحديث المنتج بنجاح" });
      } else {
        // إضافة جديدة
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        toast({ title: "تم الإضافة", description: "تم إضافة المنتج بنجاح" });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "تعذر حفظ المنتج. حاول مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right font-arabic text-blue-800">
            {product ? "تعديل المنتج" : "إضافة منتج جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-right font-arabic">اسم المنتج *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder="أدخل اسم المنتج"
                className="text-right font-arabic"
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-right font-arabic">السعر (ريال) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                required
                placeholder="0.00"
                className="text-right"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-right font-arabic">وصف المنتج *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              placeholder="أدخل وصف المنتج"
              className="text-right font-arabic"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-right font-arabic">القسم *</Label>
              <Select 
                value={formData.category_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value, subcategory_id: "" }))}
              >
                <SelectTrigger className="text-right font-arabic">
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id} className="font-arabic">
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-right font-arabic">القسم الفرعي</Label>
              <Select 
                value={formData.subcategory_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory_id: value }))}
                disabled={!formData.category_id || subcategories.length === 0}
              >
                <SelectTrigger className="text-right font-arabic">
                  <SelectValue placeholder="اختر القسم الفرعي (اختياري)" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id} className="font-arabic">
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <ImageUpload
            currentImageUrl={formData.image_url}
            onImageChange={handleImageChange}
            label="صورة المنتج"
          />

          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="in_stock"
                  checked={formData.in_stock}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, in_stock: checked }))}
                />
                <Label htmlFor="in_stock" className="font-arabic">متوفر في المخزون</Label>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                />
                <Label htmlFor="is_featured" className="font-arabic">منتج مميز</Label>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1 font-arabic bg-blue-600 hover:bg-blue-700">
              {isLoading ? "جاري الحفظ..." : product ? "تحديث المنتج" : "إضافة المنتج"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 font-arabic">
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
