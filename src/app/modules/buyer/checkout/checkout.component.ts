import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class CheckoutComponent {
  addressId: number | null = null;
  paymentType: 'COD' | 'ONLINE' = 'COD';
  placingOrder = false;

  constructor(private orderService: OrderService) {}

  placeOrder() {
    this.placingOrder = true;
    this.orderService
      .checkout({
        addressId: this.addressId,
        paymentType: this.paymentType
      })
      .subscribe({
      next: () => {
        this.addressId = null;
        this.paymentType = 'COD';
        this.placingOrder = false;
      },
      error: () => {
        this.placingOrder = false;
      }
    });
  }
}
