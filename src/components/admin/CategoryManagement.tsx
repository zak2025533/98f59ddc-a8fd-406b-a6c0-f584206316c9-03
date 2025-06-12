
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import CategoryDialog from "./CategoryDialog";
import SubcategoryDialog from "./SubcategoryDialog";

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
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="البحث في الأقسام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 font-arabic"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-pulse text-muted-foreground font-arabic">جاري التحميل...</div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-lg font-arabic">لا توجد أقسام</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category) => (
              <Card key={category.id} className="border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {category.image_url && (
                        <img
                          src={category.image_url}
                          alt={category.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-blue-800 font-arabic">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.slug}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCategoryDialog({ isOpen: true, category })}
                        className="font-arabic"
                      >
                        <Edit className="h-4 w-4 ml-1" />
                        تعديل
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-blue-700 font-arabic">الأقسام الفرعية</h4>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSubcategoryDialog({ isOpen: true, categoryId: category.id })}
                        className="font-arabic"
                      >
                        <Plus className="h-4 w-4 ml-1" />
                        إضافة قسم فرعي
                      </Button>
                    </div>
                    
                    {category.subcategories && category.subcategories.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {category.subcategories.map((subcategory) => (
                          <div
                            key={subcategory.id}
                            className="flex items-center justify-between p-3 bg-blue-50 rounded-lg"
                          >
                            <span className="font-medium text-blue-800 font-arabic">{subcategory.name}</span>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setSubcategoryDialog({ 
                                  isOpen: true, 
                                  subcategory, 
                                  categoryId: category.id 
                                })}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteSubcategory(subcategory.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm font-arabic">لا توجد أقسام فرعية</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
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
