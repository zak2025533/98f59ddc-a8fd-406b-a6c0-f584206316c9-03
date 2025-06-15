
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Phone, MapPin } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import { Order } from "./types";

interface OrderDetailsCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, newStatus: Order['status']) => void;
}

const OrderDetailsCard = ({ order, onUpdateStatus }: OrderDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-right font-arabic text-blue-800">
          تفاصيل الطلب #{order.invoice_number}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-arabic text-blue-700">تفاصيل الطلب</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between p-3 bg-gray-50 rounded border">
                  <div>
                    <span className="font-arabic font-medium">{item.product_name}</span>
                    <div className="text-sm text-gray-600 font-arabic">
                      الكمية: {item.quantity} × السعر: {item.price} ريال يمني
                    </div>
                  </div>
                  <div className="text-sm font-bold text-blue-600">
                    <span className="font-arabic">{(item.quantity * item.price).toFixed(2)} ريال يمني</span>
                  </div>
                </div>
              ))}
              <div className="border-t pt-3 font-bold bg-blue-50 p-3 rounded">
                <div className="flex justify-between">
                  <span className="font-arabic">المجموع الكلي:</span>
                  <span className="font-arabic text-blue-800">{order.total_amount} ريال يمني</span>
                </div>
              </div>
            </div>

            {(order.customer_name || order.customer_phone || order.customer_address) && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg font-arabic text-blue-700 mb-3">بيانات العميل</h3>
                <div className="space-y-2 bg-gray-50 p-3 rounded">
                  {order.customer_name && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-blue-600" />
                      <span className="font-arabic">{order.customer_name}</span>
                    </div>
                  )}
                  {order.customer_phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span className="font-arabic">{order.customer_phone}</span>
                    </div>
                  )}
                  {order.customer_address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-blue-600 mt-1" />
                      <span className="font-arabic">{order.customer_address}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-arabic text-blue-700">تحديث الحالة</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant={order.status === status ? "default" : "outline"}
                  onClick={() => onUpdateStatus(order.id, status)}
                  className="font-arabic text-xs"
                >
                  <OrderStatusBadge status={status} />
                </Button>
              ))}
            </div>
            
            {order.whatsapp_message && (
              <div className="mt-4">
                <h4 className="font-semibold text-sm font-arabic text-blue-700 mb-2">رسالة واتساب:</h4>
                <div className="bg-gray-50 p-3 rounded text-sm max-h-32 overflow-y-auto border">
                  <pre className="whitespace-pre-wrap font-arabic text-xs">
                    {order.whatsapp_message}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderDetailsCard;
