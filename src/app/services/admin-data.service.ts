import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'SELLER' | 'BUYER';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface AdminSeller {
  id: number;
  name: string;
  storeName: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  city: string;
}

export interface AdminProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  quantity: number;
  sellerName: string;
}

export interface AdminDashboardData {
  totalUsers: number;
  activeUsers: number;
  pendingProducts: number;
  ordersToday: number;
  kpis: Array<{ label: string; value: string; trend: string }>;
  topSellers: Array<{ name: string; revenue: string; orders: number }>;
  topProducts: Array<{ name: string; revenue: string; units: number }>;
  alerts: Array<{ type: string; message: string; action: string }>;
  orderTrend: Array<{ name: string; series: Array<{ name: string; value: number }> }>;
}

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  getDashboard(): Observable<AdminDashboardData> {
    return of({
      totalUsers: 12840,
      activeUsers: 9876,
      pendingProducts: 54,
      ordersToday: 312,
      kpis: [
        { label: 'Revenue', value: '₹ 8.4L', trend: '+12.4%' },
        { label: 'Orders', value: '2,418', trend: '+6.1%' },
        { label: 'New Users', value: '412', trend: '+9.3%' },
        { label: 'Avg. Order', value: '₹ 3,480', trend: '-1.8%' }
      ],
      topSellers: [
        { name: 'Ritu Textiles', revenue: '₹ 2.1L', orders: 420 },
        { name: 'Vedic Crafts', revenue: '₹ 1.7L', orders: 318 },
        { name: 'Riwaaz Studio', revenue: '₹ 1.4L', orders: 265 }
      ],
      topProducts: [
        { name: 'Ajrakh Print Saree', revenue: '₹ 98k', units: 180 },
        { name: 'Chikankari Kurti', revenue: '₹ 74k', units: 152 },
        { name: 'Handloom Dupatta', revenue: '₹ 52k', units: 210 }
      ],
      alerts: [
        { type: 'Low Stock', message: '12 products below 5 units', action: 'Review' },
        { type: 'Payment Failures', message: '8 failed payments in last 24h', action: 'Investigate' },
        { type: 'Pending Approvals', message: '5 sellers awaiting approval', action: 'Approve' }
      ],
      orderTrend: [
        {
          name: 'Orders',
          series: [
            { name: 'Mon', value: 140 },
            { name: 'Tue', value: 180 },
            { name: 'Wed', value: 220 },
            { name: 'Thu', value: 200 },
            { name: 'Fri', value: 260 },
            { name: 'Sat', value: 310 },
            { name: 'Sun', value: 190 }
          ]
        }
      ]
    });
  }

  getUsers(): Observable<AdminUser[]> {
    return of([
      { id: 1, name: 'Aditi Sharma', email: 'aditi@vedic.com', role: 'BUYER', status: 'ACTIVE', createdAt: '2025-02-12' },
      { id: 2, name: 'Sanjay Kapur', email: 'sanjay@vedic.com', role: 'SELLER', status: 'INACTIVE', createdAt: '2025-01-27' },
      { id: 3, name: 'Meera Rao', email: 'meera@vedic.com', role: 'BUYER', status: 'ACTIVE', createdAt: '2025-02-20' },
      { id: 4, name: 'Admin V', email: 'admin@vedic.com', role: 'ADMIN', status: 'ACTIVE', createdAt: '2024-12-01' }
    ]);
  }

  getSellers(): Observable<AdminSeller[]> {
    return of([
      { id: 201, name: 'Ritu Textiles', storeName: 'Ritu Textiles', email: 'ritu@store.com', phone: '+91 98765 21001', status: 'ACTIVE', city: 'Jaipur' },
      { id: 202, name: 'Vedic Crafts', storeName: 'Vedic Crafts', email: 'vedic@store.com', phone: '+91 98765 21002', status: 'INACTIVE', city: 'Delhi' },
      { id: 203, name: 'Riwaaz', storeName: 'Riwaaz Studio', email: 'riwaaz@store.com', phone: '+91 98765 21003', status: 'ACTIVE', city: 'Mumbai' }
    ]);
  }

  getPendingSellers(): Observable<AdminSeller[]> {
    return of([
      { id: 901, name: 'Ritu Textiles', storeName: 'Ritu Textiles', email: 'ritu@store.com', phone: '+91 98765 21001', status: 'PENDING', city: 'Jaipur' },
      { id: 902, name: 'Vedic Crafts', storeName: 'Vedic Crafts', email: 'vedic@store.com', phone: '+91 98765 21002', status: 'PENDING', city: 'Delhi' }
    ]);
  }

  getProducts(): Observable<AdminProduct[]> {
    return of([
      { id: 3001, title: 'Ajrakh Print Saree', brand: 'Riwaaz', price: 2899, quantity: 18, sellerName: 'Ritu Textiles' },
      { id: 3002, title: 'Chikankari Kurti', brand: 'Indika', price: 1499, quantity: 8, sellerName: 'Vedic Crafts' },
      { id: 3003, title: 'Handloom Dupatta', brand: 'Vedic Looms', price: 799, quantity: 30, sellerName: 'Riwaaz Studio' }
    ]);
  }

  getPendingProducts(): Observable<AdminProduct[]> {
    return of([
      { id: 3005, title: 'Bandhani Dress', brand: 'Satrangi', price: 1899, quantity: 12, sellerName: 'Ritu Textiles' },
      { id: 3006, title: 'Kota Doria Saree', brand: 'Indika', price: 2599, quantity: 7, sellerName: 'Vedic Crafts' }
    ]);
  }
}
