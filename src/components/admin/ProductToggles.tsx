
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface ProductTogglesProps {
  formData: {
    in_stock: boolean;
    is_featured: boolean;
  };
  onFormDataChange: (updates: Partial<ProductTogglesProps['formData']>) => void;
}

const ProductToggles = ({ formData, onFormDataChange }: ProductTogglesProps) => {
  return (
    <>
      <div className="flex items-center space-x-2 space-x-reverse">
        <Switch
          id="in_stock"
          checked={formData.in_stock}
          onCheckedChange={(checked) => onFormDataChange({ in_stock: checked })}
        />
        <Label htmlFor="in_stock" className="font-arabic">متوفر في المخزون</Label>
      </div>

      <div className="flex items-center space-x-2 space-x-reverse">
        <Switch
          id="is_featured"
          checked={formData.is_featured}
          onCheckedChange={(checked) => onFormDataChange({ is_featured: checked })}
        />
        <Label htmlFor="is_featured" className="font-arabic">منتج مميز</Label>
      </div>
    </>
  );
};

export default ProductToggles;
