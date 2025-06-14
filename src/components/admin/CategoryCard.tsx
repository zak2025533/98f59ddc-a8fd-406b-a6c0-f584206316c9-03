
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";

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

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (categoryId: string) => void;
  onAddSubcategory: (categoryId: string) => void;
  onEditSubcategory: (subcategory: Subcategory, categoryId: string) => void;
  onDeleteSubcategory: (subcategoryId: string) => void;
}

const CategoryCard = ({ 
  category, 
  onEdit, 
  onDelete, 
  onAddSubcategory, 
  onEditSubcategory, 
  onDeleteSubcategory 
}: CategoryCardProps) => {
  return (
    <Card className="border-blue-100">
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
              onClick={() => onEdit(category)}
              className="font-arabic"
            >
              <Edit className="h-4 w-4 ml-1" />
              تعديل
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(category.id)}
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
              onClick={() => onAddSubcategory(category.id)}
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
                      onClick={() => onEditSubcategory(subcategory, category.id)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteSubcategory(subcategory.id)}
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
  );
};

export default CategoryCard;
