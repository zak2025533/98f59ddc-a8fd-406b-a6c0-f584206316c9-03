
import { Badge } from "@/components/ui/badge";
import { Clock, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { Order } from "./types";

interface OrderStatusBadgeProps {
  status: Order['status'];
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusConfig = {
    pending: { variant: 'default' as const, icon: Clock, text: 'قيد الانتظار' },
    processing: { variant: 'secondary' as const, icon: Package, text: 'قيد التحضير' },
    shipped: { variant: 'outline' as const, icon: Truck, text: 'تم الشحن' },
    delivered: { variant: 'default' as const, icon: CheckCircle, text: 'تم التسليم' },
    cancelled: { variant: 'destructive' as const, icon: XCircle, text: 'ملغي' }
  };

  const config = statusConfig[status];
  if (!config) {
    return null;
  }

  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1 font-arabic">
      <Icon className="h-3 w-3" />
      {config.text}
    </Badge>
  );
};

export default OrderStatusBadge;
