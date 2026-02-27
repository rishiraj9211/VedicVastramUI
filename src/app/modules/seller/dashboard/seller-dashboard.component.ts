import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-seller-dashboard',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.scss']
})
export class SellerDashboardComponent {
  salesData = [
    { name: 'Mon', value: 12000 },
    { name: 'Tue', value: 9000 },
    { name: 'Wed', value: 15000 },
    { name: 'Thu', value: 8000 },
    { name: 'Fri', value: 17000 },
    { name: 'Sat', value: 22000 },
    { name: 'Sun', value: 13000 }
  ];
}
