
import { Button } from "@/components/ui/button";
import { CartItem } from "@/hooks/useCart";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
}

export const CartItemCard = ({ item, onUpdateQuantity, onRemoveItem }: CartItemCardProps) => {
  return (
    <div className="flex items-center gap-4 p-4 border border-blue-200 rounded-lg bg-white/50 backdrop-blur-sm">
      <img
        src={item.product.image_url || "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=100&q=80"}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded border border-blue-200"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-right font-arabic text-blue-900">{item.product.name}</h3>
        <p className="text-blue-700 font-bold font-arabic">{item.product.price} ريال يمني</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="border-blue-300 text-blue-700 hover:bg-blue-100"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-arabic text-blue-900 font-semibold">{item.quantity}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="border-blue-300 text-blue-700 hover:bg-blue-100"
        >
          <Plus className="h-4 w-4" />
        </Button>
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
