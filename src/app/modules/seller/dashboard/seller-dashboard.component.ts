import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SellerDataService, SellerStat } from '../../../services/seller-data.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent implements OnInit {
  salesData: Array<{ name: string; value: number }> = [];
  stats: SellerStat[] = [];
  topProducts: Array<{ name: string; value: number }> = [];

  constructor(private sellerData: SellerDataService) {}

  ngOnInit() {
    this.sellerData.getSalesData().subscribe((data) => {
      this.salesData = data;
    });
    this.sellerData.getDashboardStats().subscribe((stats) => {
      this.stats = stats;
    });
    this.sellerData.getTopProducts().subscribe((products) => {
      this.topProducts = products;
    });
  }
}
