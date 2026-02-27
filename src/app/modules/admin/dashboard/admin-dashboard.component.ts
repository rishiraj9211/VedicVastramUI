import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminDataService, AdminDashboardData } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  totalUsers = 0;
  activeUsers = 0;
  pendingProducts = 0;
  ordersToday = 0;
  kpis: AdminDashboardData['kpis'] = [];
  topSellers: AdminDashboardData['topSellers'] = [];
  topProducts: AdminDashboardData['topProducts'] = [];
  alerts: AdminDashboardData['alerts'] = [];
  orderTrend: AdminDashboardData['orderTrend'] = [];

  constructor(private adminData: AdminDataService) {}

  ngOnInit() {
    this.adminData.getDashboard().subscribe((data) => {
      this.totalUsers = data.totalUsers;
      this.activeUsers = data.activeUsers;
      this.pendingProducts = data.pendingProducts;
      this.ordersToday = data.ordersToday;
      this.kpis = data.kpis;
      this.topSellers = data.topSellers;
      this.topProducts = data.topProducts;
      this.alerts = data.alerts;
      this.orderTrend = data.orderTrend;
    });
  }
}
