
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "./ImageUpload";

interface ProductFormFieldsProps {
  formData: {
    name: string;
    description: string;
    price: string;
    image_url: string;
  };
  onFormDataChange: (updates: Partial<ProductFormFieldsProps['formData']>) => void;
}

const ProductFormFields = ({ formData, onFormDataChange }: ProductFormFieldsProps) => {
  return (
    <>
      <div>
        <Label htmlFor="name" className="font-arabic">اسم المنتج *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onFormDataChange({ name: e.target.value })}
          className="font-arabic text-right"
          required
        />
      </div>

      <div>
        <Label htmlFor="description" className="font-arabic">الوصف</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onFormDataChange({ description: e.target.value })}
          className="font-arabic text-right"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="price" className="font-arabic">السعر (ر.س) *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => onFormDataChange({ price: e.target.value })}
          className="font-arabic text-right"
          required
        />
      </div>

      <div>
        <Label className="font-arabic">صورة المنتج</Label>
        <ImageUpload
          currentImageUrl={formData.image_url}
          onImageChange={(url) => onFormDataChange({ image_url: url || "" })}
        />
      </div>
    </>
  );
};

export default ProductFormFields;
