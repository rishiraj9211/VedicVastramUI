export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  availableSizes: string;
  color: string;
  brand: string;
  fabric: string;
  quantity: number;
  sellerId: number;
  status: string;
  imageUrls?: string[];
}
