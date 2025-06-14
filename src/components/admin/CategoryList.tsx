
import CategoryCard from "./CategoryCard";

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

interface CategoryListProps {
  categories: Category[];
  isLoading: boolean;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddSubcategory: (categoryId: string) => void;
  onEditSubcategory: (subcategory: Subcategory, categoryId: string) => void;
  onDeleteSubcategory: (subcategoryId: string) => void;
}

const CategoryList = ({ 
  categories, 
  isLoading, 
  onEditCategory, 
  onDeleteCategory, 
  onAddSubcategory, 
  onEditSubcategory, 
  onDeleteSubcategory 
}: CategoryListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-pulse text-muted-foreground font-arabic">جاري التحميل...</div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-lg font-arabic">لا توجد أقسام</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={onEditCategory}
          onDelete={onDeleteCategory}
          onAddSubcategory={onAddSubcategory}
          onEditSubcategory={onEditSubcategory}
          onDeleteSubcategory={onDeleteSubcategory}
        />
      ))}
    </div>
  );
};

export default CategoryList;
