import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SellerAnalyticsData, SellerDataService } from '../../../services/seller-data.service';

@Component({
  selector: 'app-seller-analytics',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './seller-analytics.component.html',
  styleUrls: ['./seller-analytics.component.scss']
})
export class SellerAnalyticsComponent implements OnInit {
  salesTrend: SellerAnalyticsData['salesTrend'] = [];
  topProducts: SellerAnalyticsData['topProducts'] = [];

  constructor(private sellerData: SellerDataService) {}

  ngOnInit() {
    this.sellerData.getAnalytics().subscribe((data) => {
      this.salesTrend = data.salesTrend;
      this.topProducts = data.topProducts;
    });
  }
}
