
import { ShoppingCart } from "lucide-react";

export const EmptyCart = () => (
  <div className="flex-1 flex items-center justify-center">
    <div className="text-center">
      <ShoppingCart className="h-16 w-16 mx-auto text-blue-300 mb-4" />
      <p className="text-blue-600 font-arabic">سلة التسوق فارغة</p>
    </div>
  </div>
);
