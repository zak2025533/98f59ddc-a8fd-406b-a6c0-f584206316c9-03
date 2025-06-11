
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface SubcategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subcategory?: Subcategory | null;
  onSuccess: () => void;
  categories: Category[];
}

const SubcategoryDialog = ({ isOpen, onClose, subcategory, onSuccess, categories }: SubcategoryDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (subcategory) {
        setFormData({
          name: subcategory.name,
          category_id: subcategory.category_id,
        });
      } else {
        setFormData({
          name: "",
          category_id: "",
        });
      }
    }
  }, [isOpen, subcategory]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[\s\u0621-\u064A]+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category_id) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار القسم الرئيسي",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const subcategoryData = {
        name: formData.name,
        slug: generateSlug(formData.name),
        category_id: formData.category_id,
      };

      if (subcategory) {
        // Update existing subcategory
        const { error } = await supabase
          .from('subcategories')
          .update(subcategoryData)
          .eq('id', subcategory.id);

        if (error) throw error;

        toast({
          title: "تم التحديث",
          description: "تم تحديث الفئة الفرعية بنجاح",
        });
      } else {
        // Create new subcategory
        const { error } = await supabase
          .from('subcategories')
          .insert([subcategoryData]);

        if (error) throw error;

        toast({
          title: "تم الإضافة",
          description: "تم إضافة الفئة الفرعية بنجاح",
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving subcategory:', error);
      toast({
        title: "خطأ",
        description: "تعذر حفظ الفئة الفرعية",
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
            {subcategory ? "تعديل الفئة الفرعية" : "إضافة فئة فرعية جديدة"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">القسم الرئيسي</Label>
            <Select value={formData.category_id} onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="اختر القسم الرئيسي" />
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
            <Label htmlFor="name">اسم الفئة الفرعية</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "جاري الحفظ..." : subcategory ? "تحديث" : "إضافة"}
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

export default SubcategoryDialog;
