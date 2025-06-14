
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategorySelectorsProps {
  formData: {
    category_id: string;
    subcategory_id: string;
  };
  categories: any[];
  subcategories: any[];
  onFormDataChange: (updates: Partial<CategorySelectorsProps['formData']>) => void;
}

const CategorySelectors = ({ formData, categories, subcategories, onFormDataChange }: CategorySelectorsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="category" className="font-arabic">التصنيف *</Label>
        <Select 
          value={formData.category_id} 
          onValueChange={(value) => onFormDataChange({ category_id: value, subcategory_id: "" })}
        >
          <SelectTrigger className="font-arabic text-right">
            <SelectValue placeholder="اختر التصنيف" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id} className="font-arabic text-right">
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {formData.category_id && (
        <div>
          <Label htmlFor="subcategory" className="font-arabic">التصنيف الفرعي *</Label>
          <Select 
            value={formData.subcategory_id} 
            onValueChange={(value) => onFormDataChange({ subcategory_id: value })}
          >
            <SelectTrigger className="font-arabic text-right">
              <SelectValue placeholder="اختر التصنيف الفرعي" />
            </SelectTrigger>
            <SelectContent>
              {subcategories.map((subcategory) => (
                <SelectItem key={subcategory.id} value={subcategory.id} className="font-arabic text-right">
                  {subcategory.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default CategorySelectors;
