
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
    <div className="space-y-3">
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <Label htmlFor="name" className="font-arabic text-blue-800 font-semibold text-sm">اسم المنتج *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onFormDataChange({ name: e.target.value })}
          className="font-arabic text-right mt-1 bg-white border-blue-300 focus:border-blue-500"
          required
        />
      </div>

      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <Label htmlFor="description" className="font-arabic text-gray-800 font-semibold text-sm">الوصف</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onFormDataChange({ description: e.target.value })}
          className="font-arabic text-right mt-1 bg-white border-gray-300 focus:border-gray-500"
          rows={2}
        />
      </div>

      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
        <Label htmlFor="price" className="font-arabic text-green-800 font-semibold text-sm">السعر (ريال يمني) *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => onFormDataChange({ price: e.target.value })}
          className="font-arabic text-right mt-1 bg-white border-green-300 focus:border-green-500"
          required
        />
      </div>

      <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
        <Label className="font-arabic text-purple-800 font-semibold text-sm">صورة المنتج</Label>
        <div className="mt-1">
          <ImageUpload
            currentImageUrl={formData.image_url}
            onImageChange={(url) => onFormDataChange({ image_url: url || "" })}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFormFields;
