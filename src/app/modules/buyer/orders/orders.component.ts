import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.model';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.history().subscribe((res) => {
      this.orders = res as Order[];
      if (!this.orders.length) {
        this.orders = this.mockOrders();
      }
    }, () => {
      this.orders = this.mockOrders();
    });
  }

  private mockOrders(): Order[] {
    return [
      {
        id: 501,
        buyerId: 1,
        addressId: 12,
        totalAmount: 2499,
        paymentType: 'COD',
        status: 'PLACED',
        createdAt: new Date().toISOString()
      },
      {
        id: 502,
        buyerId: 1,
        addressId: 12,
        totalAmount: 4199,
        paymentType: 'ONLINE',
        status: 'SHIPPED',
        createdAt: new Date().toISOString()
      }
    ];
  }
}
