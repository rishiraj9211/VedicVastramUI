import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SellerDataService, SellerOrder } from '../../../services/seller-data.service';

@Component({
  selector: 'app-seller-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.scss']
})
export class SellerOrdersComponent implements OnInit {
  orders: SellerOrder[] = [];
  activeTab: 'PENDING' | 'SHIPPED' | 'COMPLETED' = 'PENDING';

  constructor(private sellerData: SellerDataService) {}

  ngOnInit() {
    this.sellerData.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  setTab(tab: 'PENDING' | 'SHIPPED' | 'COMPLETED') {
    this.activeTab = tab;
  }

  get filteredOrders() {
    if (this.activeTab === 'PENDING') {
      return this.orders.filter((order) => order.status === 'PLACED');
    }
    if (this.activeTab === 'SHIPPED') {
      return this.orders.filter((order) => order.status === 'SHIPPED');
    }
    return this.orders.filter((order) => order.status === 'DELIVERED');
  }

  updateStatus(order: SellerOrder, status: SellerOrder['status']) {
    const updated = { ...order, status };
    this.orders = this.orders.map((item) => (item.id === order.id ? updated : item));
  }
}
