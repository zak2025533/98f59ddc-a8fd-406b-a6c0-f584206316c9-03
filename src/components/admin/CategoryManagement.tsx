import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CategoryDialog from "./CategoryDialog";
import SubcategoryDialog from "./SubcategoryDialog";

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface CategoryManagementProps {
  onCategoryChange: () => void;
}

const CategoryManagement = ({ onCategoryChange }: CategoryManagementProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isSubcategoryDialogOpen, setIsSubcategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
      onCategoryChange();
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: "خطأ",
        description: "تعذر تحميل الأقسام",
        variant: "destructive",
      });
    }
  };

  const fetchSubcategories = async () => {
    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .order('name');

      if (error) throw error;
      setSubcategories(data || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا القسم؟ سيتم حذف جميع الفئات الفرعية والمنتجات المرتبطة به.')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف القسم بنجاح",
      });
      
      fetchCategories();
      fetchSubcategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: "خطأ",
        description: "تعذر حذف القسم",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الفئة؟ سيتم حذف جميع المنتجات المرتبطة بها.')) return;

    try {
      const { error } = await supabase
        .from('subcategories')
        .delete()
        .eq('id', subcategoryId);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف الفئة بنجاح",
      });
      
      fetchSubcategories();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      toast({
        title: "خطأ",
        description: "تعذر حذف الفئة",
        variant: "destructive",
      });
    }
  };

  const getSubcategoriesForCategory = (categoryId: string) => {
    return subcategories.filter(sub => sub.category_id === categoryId);
  };

  return (
    <div className="space-y-6">
      {/* Categories Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>إدارة الأقسام الرئيسية</CardTitle>
            <Button onClick={() => {
              setEditingCategory(null);
              setIsCategoryDialogOpen(true);
            }} className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة قسم جديد
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getSubcategoriesForCategory(category.id).length} فئة فرعية
                    </p>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setEditingCategory(category);
                        setIsCategoryDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subcategories Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>إدارة الفئات الفرعية</CardTitle>
            <Button onClick={() => {
              setEditingSubcategory(null);
              setIsSubcategoryDialogOpen(true);
            }} className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة فئة فرعية
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => {
              const categorySubcategories = getSubcategoriesForCategory(category.id);
              return (
                <div key={category.id} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">{category.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categorySubcategories.map((subcategory) => (
                      <div key={subcategory.id} className="flex justify-between items-center p-3 bg-muted rounded">
                        <span>{subcategory.name}</span>
                        <div className="flex space-x-1 space-x-reverse">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => {
                              setEditingSubcategory(subcategory);
                              setIsSubcategoryDialogOpen(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteSubcategory(subcategory.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {categorySubcategories.length === 0 && (
                      <p className="text-muted-foreground text-sm col-span-full">
                        لا توجد فئات فرعية في هذا القسم
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <CategoryDialog
        isOpen={isCategoryDialogOpen}
        onClose={() => setIsCategoryDialogOpen(false)}
        category={editingCategory}
        onSuccess={fetchCategories}
      />

      <SubcategoryDialog
        isOpen={isSubcategoryDialogOpen}
        onClose={() => setIsSubcategoryDialogOpen(false)}
        subcategory={editingSubcategory}
        onSuccess={fetchSubcategories}
        categories={categories}
      />
    </div>
  );
};

export default CategoryManagement;
