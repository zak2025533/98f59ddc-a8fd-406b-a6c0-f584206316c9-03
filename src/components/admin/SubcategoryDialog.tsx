
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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
}

interface SubcategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subcategory?: Subcategory | null;
  categoryId?: string;
  onSuccess: () => void;
}

const SubcategoryDialog = ({ isOpen, onClose, subcategory, categoryId, onSuccess }: SubcategoryDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category_id: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      if (subcategory) {
        setFormData({
          name: subcategory.name,
          slug: subcategory.slug,
          category_id: subcategory.category_id,
        });
      } else {
        setFormData({
          name: "",
          slug: "",
          category_id: categoryId || "",
        });
      }
    }
  }, [isOpen, subcategory, categoryId]);

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

  const generateSlug = (name: string) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0621-\u064A-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category_id) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const subcategoryData = {
        name: formData.name.trim(),
        slug: formData.slug || generateSlug(formData.name),
        category_id: formData.category_id,
      };

      // تحقق من تكرار slug مع تجنب خطأ UUID
      const slugCheckQuery = supabase
        .from('subcategories')
        .select('id')
        .eq('slug', subcategoryData.slug);

      // إضافة شرط استثناء المعرف الحالي فقط إذا كان موجوداً وصحيحاً
      if (subcategory?.id) {
        slugCheckQuery.neq('id', subcategory.id);
      }

      const { data: existing, error: checkError } = await slugCheckQuery;

      if (checkError) throw checkError;

      if (existing && existing.length > 0) {
        throw new Error("الرابط المختصر مستخدم بالفعل، الرجاء اختيار رابط آخر.");
      }

      if (subcategory?.id) {
        // تحديث
        const { error } = await supabase
          .from('subcategories')
          .update(subcategoryData)
          .eq('id', subcategory.id);

        if (error) throw error;

        toast({ title: "تم التحديث", description: "تم تحديث القسم الفرعي بنجاح" });
      } else {
        // إضافة جديدة
        const { error } = await supabase
          .from('subcategories')
          .insert([subcategoryData]);

        if (error) throw error;

        toast({ title: "تم الإضافة", description: "تم إضافة القسم الفرعي بنجاح" });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Subcategory operation error:', error);
      toast({
        title: "خطأ",
        description: error.message || "تعذر حفظ القسم الفرعي. حاول مرة أخرى.",
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
          <DialogTitle className="text-right font-arabic text-blue-800">
            {subcategory ? "تعديل القسم الفرعي" : "إضافة قسم فرعي جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-right font-arabic">القسم الرئيسي *</Label>
            <Select 
              value={formData.category_id} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
            >
              <SelectTrigger className="text-right font-arabic">
                <SelectValue placeholder="اختر القسم الرئيسي" />
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
            <Label htmlFor="name" className="text-right font-arabic">اسم القسم الفرعي *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleNameChange}
              required
              placeholder="أدخل اسم القسم الفرعي"
              className="text-right font-arabic"
            />
          </div>

          <div>
            <Label htmlFor="slug" className="text-right font-arabic">الرابط المختصر</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }))
              }
              required
              placeholder="سيتم إنشاؤه تلقائيًا"
              className="text-right"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1 font-arabic bg-blue-600 hover:bg-blue-700">
              {isLoading ? "جاري الحفظ..." : subcategory ? "تحديث" : "إضافة"}
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

export default SubcategoryDialog;
