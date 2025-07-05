
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ProductForm from "./ProductForm";

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
  onSuccess: (product?: any) => void;
}

const ProductDialog = ({ isOpen, onClose, product, onSuccess }: ProductDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white border-2 border-blue-300">
        <DialogHeader className="bg-blue-50 -mx-6 -mt-6 px-6 py-4 border-b border-blue-200">
          <DialogTitle className="font-arabic text-right text-blue-800 text-xl">
            {product ? "تعديل المنتج" : "إضافة منتج جديد"}
          </DialogTitle>
          <DialogDescription className="text-right font-arabic text-blue-600">
            {product ? "قم بتعديل بيانات المنتج أدناه" : "أدخل بيانات المنتج الجديد"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <ProductForm 
            product={product}
            onSuccess={onSuccess}
            onCancel={onClose}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
