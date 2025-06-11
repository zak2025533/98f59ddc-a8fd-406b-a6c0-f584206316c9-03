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
import ImageUpload from "./ImageUpload";

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
}

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
  onSuccess: () => void;
}

const CategoryDialog = ({ isOpen, onClose, category, onSuccess }: CategoryDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name,
          slug: category.slug,
          image_url: category.image_url || "",
        });
      } else {
        setFormData({
          name: "",
          slug: "",
          image_url: "",
        });
      }
    }
  }, [isOpen, category]);

  const generateSlug = (name: string) => {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-') // استبدال المسافات بشرطة
      .replace(/[^\w\u0621-\u064A-]/g, '') // حذف الرموز الغريبة، ونسمح بالحروف العربية
      .replace(/-+/g, '-') // إزالة الشرط المتكررة
      .replace(/^-+|-+$/g, ''); // إزالة الشرطة من البداية والنهاية
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم القسم",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const categoryData = {
        name: formData.name.trim(),
        slug: formData.slug || generateSlug(formData.name),
        image_url: formData.image_url || null,
      };

      // تحقق من تكرار slug
      const { data: existing, error: checkError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categoryData.slug)
        .neq('id', category?.id || '');

      if (checkError) throw checkError;

      if (existing.length > 0) {
        throw new Error("الرابط المختصر مستخدم بالفعل، الرجاء اختيار رابط آخر.");
      }

      if (category) {
        // تحديث
        const { error } = await supabase
          .from('categories')
          .update(categoryData)
          .eq('id', category.id);

        if (error) throw error;

        toast({ title: "تم التحديث", description: "تم تحديث القسم بنجاح" });
      } else {
        // إضافة جديدة
        const { error } = await supabase
          .from('categories')
          .insert([categoryData]);

        if (error) throw error;

        toast({ title: "تم الإضافة", description: "تم إضافة القسم بنجاح" });
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "تعذر حفظ القسم. حاول مرة أخرى.",
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
          <DialogTitle className="text-right font-cairo">
            {category ? "تعديل القسم" : "إضافة قسم جديد"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-right font-cairo">اسم القسم *</Label>
            <Input
              id="name"
              autoFocus
              value={formData.name}
              onChange={handleNameChange}
              required
              placeholder="أدخل اسم القسم"
              className="text-right"
            />
          </div>

          <div>
            <Label htmlFor="slug" className="text-right font-cairo">الرابط المختصر</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }))
              }
              pattern="^[\u0621-\u064Aa-z0-9-]+$"
              title="يسمح بالحروف العربية والإنجليزية الصغيرة والأرقام والشرطة فقط"
              required
              placeholder="سيتم إنشاؤه تلقائيًا"
              className="text-right"
            />
          </div>

          <ImageUpload
            currentImageUrl={formData.image_url}
            onImageChange={handleImageChange}
            label="صورة القسم"
          />

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1 font-cairo">
              {isLoading ? "جاري الحفظ..." : category ? "تحديث" : "إضافة"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 font-cairo">
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;
