
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, MapPin, Phone } from "lucide-react";
import { Order } from "./types";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderActions from "./OrderActions";

interface OrdersTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
  onDeleteOrder: (orderId: string) => void;
  onOpenWhatsApp: (order: Order) => void;
}

const OrdersTable = ({ orders, onViewOrder, onUpdateStatus, onDeleteOrder, onOpenWhatsApp }: OrdersTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right font-arabic">رقم الفاتورة</TableHead>
            <TableHead className="text-right font-arabic">بيانات العميل</TableHead>
            <TableHead className="text-right font-arabic">العناصر</TableHead>
            <TableHead className="text-right font-arabic">المبلغ الإجمالي</TableHead>
            <TableHead className="text-right font-arabic">الحالة</TableHead>
            <TableHead className="text-right font-arabic">التاريخ</TableHead>
            <TableHead className="text-right font-arabic">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium font-arabic">#{order.invoice_number}</TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  {order.customer_name && (
                    <div className="flex items-center gap-1 font-arabic">
                      <User className="h-3 w-3" />
                      {order.customer_name}
                    </div>
                  )}
                  {order.customer_phone && (
                    <div className="flex items-center gap-1 font-arabic">
                      <Phone className="h-3 w-3" />
                      {order.customer_phone}
                    </div>
                  )}
                  {order.customer_address && (
                    <div className="flex items-center gap-1 font-arabic">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-[150px]">{order.customer_address}</span>
                    </div>
                  )}
                  {!order.customer_name && !order.customer_phone && !order.customer_address && (
                    <span className="text-gray-500 font-arabic">لا توجد بيانات</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {order.items.slice(0, 2).map((item, index) => (
                    <div key={index} className="text-sm font-arabic">
                      {item.product_name} × {item.quantity}
                      <span className="text-blue-600 mr-2">({item.price} ريال يمني)</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="text-xs text-gray-500 font-arabic">
                      +{order.items.length - 2} منتج آخر
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-bold text-blue-800 font-arabic">
                {order.total_amount} ريال يمني
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell className="font-arabic">
                {new Date(order.created_at).toLocaleDateString('ar-SA')}
              </TableCell>
              <TableCell>
                <OrderActions
                  order={order}
                  onView={onViewOrder}
                  onUpdateStatus={onUpdateStatus}
                  onDelete={onDeleteOrder}
                  onOpenWhatsApp={onOpenWhatsApp}
                />
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                <div className="text-gray-500 font-arabic">لا توجد طلبات حتى الآن</div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
