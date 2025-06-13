
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Package, Truck, CheckCircle, Clock, User, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
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
      // مؤقتاً سنقوم بإنشاء بيانات وهمية للطلبات
      const mockOrders: Order[] = [
        {
          id: '1',
          customer_name: 'أحمد محمد',
          customer_phone: '0512345678',
          customer_address: 'الرياض، حي النرجس',
          total_amount: 150.00,
          status: 'pending',
          created_at: new Date().toISOString(),
          items: [
            { id: '1', product_name: 'كيك الشوكولاته', quantity: 2, price: 75.00 }
          ]
        },
        {
          id: '2',
          customer_name: 'فاطمة علي',
          customer_phone: '0523456789',
          customer_address: 'جدة، حي الحمراء',
          total_amount: 89.50,
          status: 'processing',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          items: [
            { id: '2', product_name: 'مشروب منعش', quantity: 3, price: 29.83 }
          ]
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      // هنا سيتم تحديث حالة الطلب في قاعدة البيانات
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus }
            : order
        )
      );
      
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
          <CardTitle className="text-right font-arabic text-blue-800">إدارة الطلبات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right font-arabic">رقم الطلب</TableHead>
                  <TableHead className="text-right font-arabic">العميل</TableHead>
                  <TableHead className="text-right font-arabic">المبلغ الإجمالي</TableHead>
                  <TableHead className="text-right font-arabic">الحالة</TableHead>
                  <TableHead className="text-right font-arabic">التاريخ</TableHead>
                  <TableHead className="text-right font-arabic">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium font-arabic">#{order.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-blue-600" />
                          <span className="font-arabic">{order.customer_name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          <span className="font-arabic">{order.customer_phone}</span>
                        </div>
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
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedOrder && (
        <Card>
          <CardHeader>
            <CardTitle className="text-right font-arabic text-blue-800">
              تفاصيل الطلب #{selectedOrder.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg font-arabic text-blue-700">معلومات العميل</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="font-arabic">{selectedOrder.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="font-arabic">{selectedOrder.customer_phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="font-arabic">{selectedOrder.customer_address}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg font-arabic text-blue-700">تحديث الحالة</h3>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'processing', 'shipped', 'delivered'] as const).map((status) => (
                    <Button
                      key={status}
                      size="sm"
                      variant={selectedOrder.status === status ? "default" : "outline"}
                      onClick={() => updateOrderStatus(selectedOrder.id, status)}
                      className="font-arabic"
                    >
                      {getStatusBadge(status)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrdersManagement;
