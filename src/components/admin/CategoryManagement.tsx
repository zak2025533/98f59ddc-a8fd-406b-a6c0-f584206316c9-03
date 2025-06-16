
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CategoryDialog from "./CategoryDialog";
import SubcategoryDialog from "./SubcategoryDialog";
import CategorySearch from "./CategorySearch";
import CategoryList from "./CategoryList";

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  slug: string;
  category_id: string;
}

interface CategoryManagementProps {
  onStatsUpdate: () => void;
}

const CategoryManagement = ({ onStatsUpdate }: CategoryManagementProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [categoryDialog, setCategoryDialog] = useState<{
    isOpen: boolean;
    category?: Category | null;
  }>({ isOpen: false });
  const [subcategoryDialog, setSubcategoryDialog] = useState<{
    isOpen: boolean;
    subcategory?: Subcategory | null;
    categoryId?: string;
  }>({ isOpen: false });

  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          subcategories (*)
        `)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "خطأ",
        description: "تعذر جلب الأقسام",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا القسم؟")) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      toast({ title: "تم الحذف", description: "تم حذف القسم بنجاح" });
      fetchCategories();
      onStatsUpdate();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "تعذر حذف القسم",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا القسم الفرعي؟")) return;

    try {
      const { error } = await supabase
        .from('subcategories')
        .delete()
        .eq('id', subcategoryId);

      if (error) throw error;

      toast({ title: "تم الحذف", description: "تم حذف القسم الفرعي بنجاح" });
      fetchCategories();
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "تعذر حذف القسم الفرعي",
        variant: "destructive",
      });
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-arabic text-blue-800">إدارة الأقسام والأقسام الفرعية</CardTitle>
          <Button 
            onClick={() => setCategoryDialog({ isOpen: true })}
            className="bg-blue-600 hover:bg-blue-700 font-arabic"
          >
            <Plus className="h-4 w-4 ml-2" />
            إضافة قسم جديد
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <CategorySearch 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <CategoryList
          categories={filteredCategories}
          isLoading={isLoading}
          onEditCategory={(category) => setCategoryDialog({ isOpen: true, category })}
          onDeleteCategory={handleDeleteCategory}
          onAddSubcategory={(categoryId) => setSubcategoryDialog({ isOpen: true, categoryId })}
          onEditSubcategory={(subcategory, categoryId) => setSubcategoryDialog({ 
            isOpen: true, 
            subcategory, 
            categoryId 
          })}
          onDeleteSubcategory={handleDeleteSubcategory}
        />
      </CardContent>

      <CategoryDialog
        isOpen={categoryDialog.isOpen}
        onClose={() => setCategoryDialog({ isOpen: false })}
        category={categoryDialog.category}
        onSuccess={() => {
          fetchCategories();
          onStatsUpdate();
        }}
      />

      <SubcategoryDialog
        isOpen={subcategoryDialog.isOpen}
        onClose={() => setSubcategoryDialog({ isOpen: false })}
        subcategory={subcategoryDialog.subcategory}
        categoryId={subcategoryDialog.categoryId}
        onSuccess={fetchCategories}
      />
    </Card>
  );
};

export default CategoryManagement;
