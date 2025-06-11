
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ImageUpload from "./ImageUpload";

interface Category {
  id: string;
  name: string;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  image_url?: string;
  subcategory_id: string;
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
    price: "",
    stock: "",
    image_url: "",
    subcategory_id: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      if (product) {
        setFormData({
          name: product.name,
          description: product.description || "",
          price: product.price.toString(),
          stock: product.stock.toString(),
          image_url: product.image_url || "",
          subcategory_id: product.subcategory_id,
        });
        fetchSubcategoriesForProduct(product.subcategory_id);
      } else {
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          image_url: "",
          subcategory_id: "",
        });
        setSelectedCategoryId("");
        setSubcategories([]);
      }
    }
  }, [isOpen, product]);

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

  const fetchSubcategoriesForProduct = async (subcategoryId: string) => {
    try {
      const { data: subcatData } = await supabase
        .from('subcategories')
        .select('category_id')
        .eq('id', subcategoryId)
        .single();
      
      if (subcatData) {
        setSelectedCategoryId(subcatData.category_id);
        fetchSubcategories(subcatData.category_id);
      }
    } catch (error) {
      console.error('Error fetching subcategory for product:', error);
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

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setFormData(prev => ({ ...prev, subcategory_id: "" }));
    fetchSubcategories(categoryId);
  };

  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم المنتج",
        variant: "destructive",
      });
      return;
    }

    if (!formData.subcategory_id) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار الفئة الفرعية",
        variant: "destructive",
      });
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال سعر صحيح",
        variant: "destructive",
      });
      return;
    }

    if (!formData.stock || parseInt(formData.stock) < 0) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال كمية مخزون صحيحة",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image_url: formData.image_url || null,
        subcategory_id: formData.subcategory_id,
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: "تم التحديث",
          description: "تم تحديث المنتج بنجاح",
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        toast({
          title: "تم الإضافة",
          description: "تم إضافة المنتج بنجاح",
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "خطأ",
        description: "تعذر حفظ المنتج. يرجى التحقق من البيانات والمحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? "تعديل المنتج" : "إضافة منتج جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">اسم المنتج *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
              placeholder="أدخل اسم المنتج"
            />
          </div>

          <div>
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="أدخل وصف المنتج (اختياري)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">السعر (ر.س) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="stock">المخزون *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                required
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <Label>القسم *</Label>
            <Select value={selectedCategoryId} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>الفئة الفرعية *</Label>
            <Select 
              value={formData.subcategory_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory_id: value }))}
              disabled={!selectedCategoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedCategoryId ? "اختر الفئة الفرعية" : "اختر القسم أولاً"} />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ImageUpload
            currentImageUrl={formData.image_url}
            onImageChange={handleImageChange}
            label="صورة المنتج"
          />

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "جاري الحفظ..." : product ? "تحديث" : "إضافة"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
