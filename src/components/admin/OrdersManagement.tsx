
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Order, OrderItem } from "./orders/types";
import OrdersTable from "./orders/OrdersTable";
import OrderDetailsCard from "./orders/OrderDetailsCard";

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
      
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          id,
          invoice_number,
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
        invoice_number: order.invoice_number,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        customer_address: order.customer_address,
        total_amount: order.total_amount,
        status: order.status as Order['status'],
        whatsapp_message: order.whatsapp_message,
        created_at: order.created_at,
        items: (order.order_items || []) as OrderItem[],
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

  const deleteOrder = async (orderId: string) => {
    try {
      // First delete related order_items to avoid foreign key violation
      const { error: itemsError } = await supabase
        .from('order_items')
        .delete()
        .eq('order_id', orderId);
        
      if (itemsError) throw itemsError;

      // Then delete the order itself
      const { error: orderError } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId);

      if (orderError) throw orderError;
      
      setOrders(prev => prev.filter(order => order.id !== orderId));
      
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(null);
      }
      
      toast({
        title: "تم حذف الطلب",
        description: "تم حذف الطلب بنجاح",
      });
      
      onStatsUpdate();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الطلب",
        variant: "destructive",
      });
    }
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
          <OrdersTable
            orders={orders}
            onViewOrder={setSelectedOrder}
            onUpdateStatus={updateOrderStatus}
            onDeleteOrder={deleteOrder}
            onOpenWhatsApp={openWhatsApp}
          />
        </CardContent>
      </Card>

      {selectedOrder && (
        <OrderDetailsCard
          order={selectedOrder}
          onUpdateStatus={updateOrderStatus}
        />
      )}
    </div>
  );
};

export default OrdersManagement;
