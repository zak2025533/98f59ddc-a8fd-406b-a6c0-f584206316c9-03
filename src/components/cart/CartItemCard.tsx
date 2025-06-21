import { Button } from "@/components/ui/button";
import { CartItem } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  isRTL?: boolean; // اختياري لتفعيل التنسيق العربي
}

export const CartItemCard = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  isRTL = true,
}: CartItemCardProps) => {
  return (
    <div
      className={`flex ${isRTL ? "rtl" : ""} items-center gap-4 p-4 border border-blue-200 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm`}
    >
      <img
        src={
          item.product.image_url ||
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=100&q=80"
        }
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-lg border border-blue-200"
      />

      <div className="flex-1">
        <h3 className="text-blue-900 font-semibold font-arabic text-right">{item.product.name}</h3>
        <p className="text-blue-700 font-bold font-arabic text-sm mt-1">
          {item.product.price.toLocaleString()} <span className="text-xs">ريال يمني</span>
        </p>
      </div>

      <div className="flex flex-col justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="w-6 text-center font-arabic text-blue-900 font-semibold">
            {item.quantity}
          </span>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="border-blue-300 text-blue-700 hover:bg-blue-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => onRemoveItem(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
