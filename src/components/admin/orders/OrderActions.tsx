
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Order } from "./types";

interface OrderActionsProps {
  order: Order;
  onView: (order: Order) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onDelete: (orderId: string) => void;
  onOpenWhatsApp: (order: Order) => void;
}

const OrderActions = ({ order, onView, onUpdateStatus, onDelete, onOpenWhatsApp }: OrderActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onView(order)}
        className="font-arabic"
      >
        <Eye className="h-4 w-4 ml-2" />
        عرض
      </Button>
      {order.whatsapp_message && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onOpenWhatsApp(order)}
          className="font-arabic"
        >
          <ExternalLink className="h-4 w-4 ml-2" />
          واتساب
        </Button>
      )}
      {order.status === 'pending' && (
        <Button
          size="sm"
          onClick={() => onUpdateStatus(order.id, 'processing')}
          className="font-arabic"
        >
          قبول
        </Button>
      )}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="destructive"
            className="font-arabic"
          >
            <Trash2 className="h-4 w-4 ml-2" />
            حذف
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right font-arabic">
              تأكيد حذف الطلب
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right font-arabic">
              هل أنت متأكد من حذف الطلب #{order.invoice_number}؟ لا يمكن التراجع عن هذا الإجراء.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-arabic">إلغاء</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(order.id)}
              className="font-arabic bg-red-600 hover:bg-red-700"
            >
              حذف الطلب
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrderActions;
