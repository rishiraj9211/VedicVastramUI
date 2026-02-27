export interface Order {
  id: number;
  buyerId: number;
  addressId: number;
  totalAmount: number;
  paymentType: 'COD' | 'ONLINE';
  status: 'PLACED' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
}
