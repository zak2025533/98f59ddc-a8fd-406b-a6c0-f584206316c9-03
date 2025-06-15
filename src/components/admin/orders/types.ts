
export interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  invoice_number: number;
  customer_name: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  total_amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  whatsapp_message: string | null;
  created_at: string;
  items: OrderItem[];
}
