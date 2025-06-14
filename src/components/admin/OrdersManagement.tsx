
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Package, Truck, CheckCircle, Clock, User, MapPin, Phone, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  whatsapp_message: string | null;
  created_at: string;
  items: OrderItem[];
}

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

interface OrdersManagementProps {
  onStatsUpdate: () => void;
}

const OrdersManagement = ({ onStatsUpdate }: OrdersManagementProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // جلب الطلبات مع عناصرها
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id,
          customer_name,
          customer_phone,
          customer_address,
          total_amount,
          status,
          whatsapp_message,
          created_at,
          order_items (
            id,
            product_name,
            quantity,
            price
          )
        `)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      const formattedOrders: Order[] = (ordersData || []).map(order => ({
        id: order.id,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        customer_address: order.customer_address,
        total_amount: order.total_amount,
        status: order.status as Order['status'],
        whatsapp_message: order.whatsapp_message,
        created_at: order.created_at,
        items: order.order_items || []
      }));
      
      setOrders(formattedOrders);
      onStatsUpdate();
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "خطأ",
        description: "فشل في جلب الطلبات",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus }
            : order
        )
      );
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
      
      toast({
        title: "تم تحديث الطلب",
        description: "تم تحديث حالة الطلب بنجاح",
      });
      
      onStatsUpdate();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحديث حالة الطلب",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { variant: 'default' as const, icon: Clock, text: 'قيد الانتظار' },
      processing: { variant: 'secondary' as const, icon: Package, text: 'قيد التحضير' },
      shipped: { variant: 'outline' as const, icon: Truck, text: 'تم الشحن' },
      delivered: { variant: 'default' as const, icon: CheckCircle, text: 'تم التسليم' },
      cancelled: { variant: 'destructive' as const, icon: Clock, text: 'ملغي' }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 font-arabic">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const openWhatsApp = (order: Order) => {
    if (order.whatsapp_message) {
      const encodedMessage = encodeURIComponent(order.whatsapp_message);
      window.open(`https://wa.me/967715833246?text=${encodedMessage}`, '_blank');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-blue-600 font-arabic">جاري تحميل الطلبات...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-right font-arabic text-blue-800">إدارة الطلبات ({orders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right font-arabic">رقم الطلب</TableHead>
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
                    <TableCell className="font-medium font-arabic">#{order.id.slice(0, 8)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <div key={index} className="text-sm font-arabic">
                            {item.product_name} × {item.quantity}
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
                      {order.total_amount} ريال
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="font-arabic">
                      {new Date(order.created_at).toLocaleDateString('ar-SA')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                          className="font-arabic"
                        >
                          <Eye className="h-4 w-4 ml-2" />
                          عرض
                        </Button>
                        {order.whatsapp_message && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openWhatsApp(order)}
                            className="font-arabic"
                          >
                            <ExternalLink className="h-4 w-4 ml-2" />
                            واتساب
                          </Button>
                        )}
                        {order.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                            className="font-arabic"
                          >
                            قبول
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-gray-500 font-arabic">لا توجد طلبات حتى الآن</div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedOrder && (
        <Card>
          <CardHeader>
            <CardTitle className="text-right font-arabic text-blue-800">
              تفاصيل الطلب #{selectedOrder.id.slice(0, 8)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg font-arabic text-blue-700">تفاصيل الطلب</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="font-arabic">{item.product_name}</span>
                      <div className="text-sm">
                        <span className="font-arabic">{item.quantity} × {item.price} ريال</span>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-bold">
                    <div className="flex justify-between">
                      <span className="font-arabic">المجموع الكلي:</span>
                      <span className="font-arabic">{selectedOrder.total_amount} ريال</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg font-arabic text-blue-700">تحديث الحالة</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(['pending', 'processing', 'shipped', 'delivered'] as const).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedOrder.status === status ? "default" : "outline"}
                      onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      className="font-arabic text-xs"
                    >
                      {getStatusBadge(status)}
                    </Button>
                  ))}
                </div>
                
                {selectedOrder.whatsapp_message && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-sm font-arabic text-blue-700 mb-2">رسالة واتساب:</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm max-h-32 overflow-y-auto">
                      <pre className="whitespace-pre-wrap font-arabic text-xs">
                        {selectedOrder.whatsapp_message}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersManagement;
