
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface CartHeaderProps {
  cartCount: number;
}

export const CartHeader = ({ cartCount }: CartHeaderProps) => (
  <SheetHeader>
    <SheetTitle className="text-right font-arabic text-blue-900">سلة التسوق ({cartCount} منتج)</SheetTitle>
  </SheetHeader>
);
