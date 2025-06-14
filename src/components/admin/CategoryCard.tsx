
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
    <Card className="bg-white border-2 border-gray-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {category.image_url && (
              <img
                src={category.image_url}
                alt={category.name}
                className="w-16 h-16 object-cover rounded-lg border-2 border-gray-300"
              />
            )}
            <div>
              <h3 className="text-xl font-bold text-gray-800 font-arabic mb-1">{category.name}</h3>
              <p className="text-sm text-gray-600 font-medium">{category.slug}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onEdit(category)}
              className="font-arabic bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Edit className="h-4 w-4 ml-1" />
              تعديل
            </Button>
            <Button
              size="sm"
              onClick={() => onDelete(category.id)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border-t-2 border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800 font-arabic text-lg">الأقسام الفرعية</h4>
            <Button
              size="sm"
              onClick={() => onAddSubcategory(category.id)}
              className="font-arabic bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="h-4 w-4 ml-1" />
              إضافة قسم فرعي
            </Button>
          </div>
          
          {category.subcategories && category.subcategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.subcategories.map((subcategory) => (
                <div
                  key={subcategory.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-2 border-gray-200"
                >
                  <span className="font-medium text-gray-800 font-arabic">{subcategory.name}</span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEditSubcategory(subcategory, category.id)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-100 p-1"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteSubcategory(subcategory.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-100 p-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm font-arabic bg-gray-100 p-4 rounded-lg border-2 border-gray-200 text-center">لا توجد أقسام فرعية</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
