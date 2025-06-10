
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
        // Find the category for this subcategory
        fetchSubcategories(product.subcategory_id);
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

  const fetchSubcategories = async (categoryId?: string) => {
    try {
      let query = supabase
        .from('subcategories')
        .select('id, name, category_id')
        .order('name');

      if (categoryId) {
        // If we have a subcategory_id, find its category
        const { data: subcatData } = await supabase
          .from('subcategories')
          .select('category_id')
          .eq('id', categoryId)
          .single();
        
        if (subcatData) {
          setSelectedCategoryId(subcatData.category_id);
          query = query.eq('category_id', subcatData.category_id);
        }
      } else if (selectedCategoryId) {
        query = query.eq('category_id', selectedCategoryId);
      }

      const { data, error } = await query;
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
    setIsLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description || null,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image_url: formData.image_url || null,
        subcategory_id: formData.subcategory_id,
      };

      if (product) {
        // Update existing product
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
        // Create new product
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
        description: "تعذر حفظ المنتج",
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
            <Label htmlFor="name">اسم المنتج</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">السعر (ر.س)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="stock">المخزون</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label>القسم</Label>
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
            <Label>الفئة الفرعية</Label>
            <Select 
              value={formData.subcategory_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الفئة الفرعية" />
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
