
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-arabic text-right">
            {product ? "تعديل المنتج" : "إضافة منتج جديد"}
          </DialogTitle>
        </DialogHeader>

        <ProductForm 
          product={product}
          onSuccess={onSuccess}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
