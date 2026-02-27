import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  totalUsers = 12840;
  activeUsers = 9876;
  pendingProducts = 54;
  ordersToday = 312;

  kpis = [
    { label: 'Revenue', value: '₹ 8.4L', trend: '+12.4%' },
    { label: 'Orders', value: '2,418', trend: '+6.1%' },
    { label: 'New Users', value: '412', trend: '+9.3%' },
    { label: 'Avg. Order', value: '₹ 3,480', trend: '-1.8%' }
  ];

  topSellers = [
    { name: 'Ritu Textiles', revenue: '₹ 2.1L', orders: 420 },
    { name: 'Vedic Crafts', revenue: '₹ 1.7L', orders: 318 },
    { name: 'Riwaaz Studio', revenue: '₹ 1.4L', orders: 265 }
  ];

  topProducts = [
    { name: 'Ajrakh Print Saree', revenue: '₹ 98k', units: 180 },
    { name: 'Chikankari Kurti', revenue: '₹ 74k', units: 152 },
    { name: 'Handloom Dupatta', revenue: '₹ 52k', units: 210 }
  ];

  alerts = [
    { type: 'Low Stock', message: '12 products below 5 units', action: 'Review' },
    { type: 'Payment Failures', message: '8 failed payments in last 24h', action: 'Investigate' },
    { type: 'Pending Approvals', message: '5 sellers awaiting approval', action: 'Approve' }
  ];

  orderTrend = [
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
  ];
}
