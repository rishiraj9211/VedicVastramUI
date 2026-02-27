import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface SellerOption {
  id: number;
  name: string;
}

@Component({
  selector: 'app-admin-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxChartsModule],
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.scss']
})
export class AdminAnalyticsComponent {
  sellerOptions: SellerOption[] = [
    { id: 0, name: 'All Sellers' },
    { id: 201, name: 'Ritu Textiles' },
    { id: 202, name: 'Vedic Crafts' },
    { id: 203, name: 'Riwaaz Studio' }
  ];

  selectedSellerId = 0;

  overallSales = [
    {
      name: 'Sales',
      series: [
        { name: 'Mon', value: 18000 },
        { name: 'Tue', value: 22000 },
        { name: 'Wed', value: 19500 },
        { name: 'Thu', value: 26000 },
        { name: 'Fri', value: 30000 },
        { name: 'Sat', value: 42000 },
        { name: 'Sun', value: 28000 }
      ]
    }
  ];

  sellerSalesMap: Record<number, any[]> = {
    201: [
      { name: 'Mon', value: 5000 },
      { name: 'Tue', value: 7200 },
      { name: 'Wed', value: 6400 },
      { name: 'Thu', value: 8100 },
      { name: 'Fri', value: 9300 },
      { name: 'Sat', value: 12000 },
      { name: 'Sun', value: 7000 }
    ],
    202: [
      { name: 'Mon', value: 4200 },
      { name: 'Tue', value: 6100 },
      { name: 'Wed', value: 5200 },
      { name: 'Thu', value: 6900 },
      { name: 'Fri', value: 8700 },
      { name: 'Sat', value: 11000 },
      { name: 'Sun', value: 6400 }
    ],
    203: [
      { name: 'Mon', value: 6300 },
      { name: 'Tue', value: 7400 },
      { name: 'Wed', value: 7800 },
      { name: 'Thu', value: 9100 },
      { name: 'Fri', value: 10200 },
      { name: 'Sat', value: 13500 },
      { name: 'Sun', value: 8600 }
    ]
  };

  get sellerSales() {
    if (this.selectedSellerId === 0) {
      return this.overallSales[0].series;
    }
    return this.sellerSalesMap[this.selectedSellerId] ?? [];
  }
}
