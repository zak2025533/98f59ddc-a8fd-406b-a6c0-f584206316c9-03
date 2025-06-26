
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  total: number;
  onClearCart: () => void;
  onHandleOrder: () => void;
}

export const CartSummary = ({ total, onClearCart, onHandleOrder }: CartSummaryProps) => {
  return (
    <div className="border-t border-blue-200 pt-4 space-y-4 bg-white/30 backdrop-blur-sm rounded-lg p-4">
      <div className="flex justify-between items-center text-lg font-bold">
        <span className="font-arabic text-blue-900">المجموع: {total.toFixed(2)} ريال يمني</span>
      </div>
      <div className="space-y-2">
        <Button onClick={onHandleOrder} className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-900/90 text-white font-arabic shadow-lg">
          إتمام الطلب عبر واتساب
        </Button>
        <Button variant="outline" className="w-full font-arabic border-blue-300 text-blue-700 hover:bg-blue-50" onClick={onClearCart}>
          مسح السلة
        </Button>
      </div>
    </div>
  );
};
