import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SellerStat {
  label: string;
  value: string;
  trend: string;
}

export interface SellerOrder {
  id: number;
  product: string;
  customer: string;
  amount: number;
  status: 'PLACED' | 'SHIPPED' | 'DELIVERED';
}

export interface SellerProduct {
  id: number;
  title: string;
  price: number;
  status?: string;
}

export interface SellerAnalyticsData {
  salesTrend: Array<{ name: string; series: Array<{ name: string; value: number }> }>;
  topProducts: Array<{ name: string; value: number }>;
}

@Injectable({ providedIn: 'root' })
export class SellerDataService {
  getDashboardStats(): Observable<SellerStat[]> {
    return of([
      { label: 'Revenue', value: '₹ 1.2L', trend: '+12%' },
      { label: 'Orders', value: '312', trend: '+8%' },
      { label: 'Returns', value: '3.2%', trend: '-0.6%' }
    ]);
  }

  getSalesData(): Observable<Array<{ name: string; value: number }>> {
    return of([
      { name: 'Mon', value: 12000 },
      { name: 'Tue', value: 9000 },
      { name: 'Wed', value: 15000 },
      { name: 'Thu', value: 8000 },
      { name: 'Fri', value: 17000 },
      { name: 'Sat', value: 22000 },
      { name: 'Sun', value: 13000 }
    ]);
  }

  getTopProducts(): Observable<Array<{ name: string; value: number }>> {
    return of([
      { name: 'Ajrakh Print Saree', value: 62 },
      { name: 'Handloom Dupatta', value: 48 },
      { name: 'Chikankari Kurti', value: 36 }
    ]);
  }

  getOrders(): Observable<SellerOrder[]> {
    return of([
      { id: 9801, product: 'Ajrakh Print Saree', customer: 'Anita', amount: 2899, status: 'PLACED' },
      { id: 9802, product: 'Handloom Dupatta', customer: 'Rohan', amount: 799, status: 'SHIPPED' },
      { id: 9803, product: 'Chikankari Kurti', customer: 'Isha', amount: 1499, status: 'DELIVERED' }
    ]);
  }

  getMyProducts(): Observable<SellerProduct[]> {
    return of([
      { id: 7001, title: 'Handloom Dupatta', price: 899, status: 'APPROVED' },
      { id: 7002, title: 'Printed Anarkali', price: 2299, status: 'PENDING' }
    ]);
  }

  getAnalytics(): Observable<SellerAnalyticsData> {
    return of({
      salesTrend: [
        {
          name: 'Sales',
          series: [
            { name: 'Mon', value: 12000 },
            { name: 'Tue', value: 15500 },
            { name: 'Wed', value: 9800 },
            { name: 'Thu', value: 17800 },
            { name: 'Fri', value: 21000 },
            { name: 'Sat', value: 26000 },
            { name: 'Sun', value: 16000 }
          ]
        }
      ],
      topProducts: [
        { name: 'Ajrakh Print Saree', value: 62 },
        { name: 'Handloom Dupatta', value: 48 },
        { name: 'Chikankari Kurti', value: 36 }
      ]
    });
  }
}
