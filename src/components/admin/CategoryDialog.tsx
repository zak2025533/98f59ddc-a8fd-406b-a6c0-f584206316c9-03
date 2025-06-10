
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug?: string;
  category_id?: string;
}

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
  onSuccess: () => void;
  type: "category" | "subcategory";
  categories?: Category[];
}

const CategoryDialog = ({ isOpen, onClose, category, onSuccess, type, categories = [] }: CategoryDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name,
          category_id: category.category_id || "",
        });
      } else {
        setFormData({
          name: "",
          category_id: "",
        });
      }
    }
  }, [isOpen, category]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === "category") {
        const categoryData = {
          name: formData.name,
          slug: generateSlug(formData.name),
        };

        if (category) {
          // Update existing category
          const { error } = await supabase
            .from('categories')
            .update(categoryData)
            .eq('id', category.id);

          if (error) throw error;

          toast({
            title: "تم التحديث",
            description: "تم تحديث القسم بنجاح",
          });
        } else {
          // Create new category
          const { error } = await supabase
            .from('categories')
            .insert([categoryData]);

          if (error) throw error;

          toast({
            title: "تم الإضافة",
            description: "تم إضافة القسم بنجاح",
          });
        }
      } else {
        const subcategoryData = {
          name: formData.name,
          slug: generateSlug(formData.name),
          category_id: formData.category_id,
        };

        if (category) {
          // Update existing subcategory
          const { error } = await supabase
            .from('subcategories')
            .update(subcategoryData)
            .eq('id', category.id);

          if (error) throw error;

          toast({
            title: "تم التحديث",
            description: "تم تحديث الفئة بنجاح",
          });
        } else {
          // Create new subcategory
          const { error } = await supabase
            .from('subcategories')
            .insert([subcategoryData]);

          if (error) throw error;

          toast({
            title: "تم الإضافة",
            description: "تم إضافة الفئة بنجاح",
          });
        }
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "خطأ",
        description: "تعذر حفظ البيانات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category 
              ? `تعديل ${type === "category" ? "القسم" : "الفئة"}` 
              : `إضافة ${type === "category" ? "قسم" : "فئة"} ${type === "subcategory" ? "فرعية" : ""} جديد${type === "subcategory" ? "ة" : ""}`
            }
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">
              {type === "category" ? "اسم القسم" : "اسم الفئة"}
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          {type === "subcategory" && (
            <div>
              <Label>القسم الرئيسي</Label>
              <Select 
                value={formData.category_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم الرئيسي" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "جاري الحفظ..." : category ? "تحديث" : "إضافة"}
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

export default CategoryDialog;
