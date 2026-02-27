import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../models/cart.model';
import { CartService } from '../../../services/cart.service';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../../services/address.service';
import { OrderService } from '../../../services/order.service';
import { CartStoreService, LocalCartItem } from '../../../services/cart-store.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent implements OnInit {
  items: LocalCartItem[] = [];
  addresses: Address[] = [];
  selectedAddressId: number | null = null;
  paymentType: 'COD' | 'ONLINE' = 'COD';

  constructor(
    private cartService: CartService,
    private cartStore: CartStoreService,
    private addressService: AddressService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.cartStore.items$.subscribe((items) => {
      this.items = items;
    });

    this.cartService.list().subscribe((res) => {
      const apiItems = res as CartItem[];
      if (apiItems?.length) {
        apiItems.forEach((item) => {
          this.cartStore.add({
            productId: item.productId,
            quantity: item.quantity
          });
        });
      }
    });

    this.addressService.list().subscribe((res) => {
      this.addresses = this.normalizeAddresses(res);
      if (this.addresses.length && !this.selectedAddressId) {
        this.selectedAddressId = this.addresses[0].id ?? null;
      }
    });
  }

  removeItem(id: number) {
    this.cartStore.remove(id);
    this.cartService.remove(id).subscribe();
  }

  updateQty(item: LocalCartItem, qty: number) {
    const nextQty = Math.max(1, qty || 1);
    this.cartStore.update(item.id, { quantity: nextQty });
  }

  updateSize(item: LocalCartItem, size: string) {
    this.cartStore.update(item.id, { size });
  }

  getSizes(item: LocalCartItem) {
    return (item.availableSizes || '')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  checkout() {
    if (!this.selectedAddressId) return;
    this.orderService
      .checkout({ addressId: this.selectedAddressId, paymentType: this.paymentType })
      .subscribe();
  }

  private normalizeAddresses(res: unknown): Address[] {
    const normalize = (addr: any): Address => ({
      id: addr.id ?? addr.addressId,
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine: addr.addressLine,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode
    });

    if (Array.isArray(res)) {
      return res.map(normalize) as Address[];
    }
    if (res && typeof res === 'object') {
      const data = res as { data?: unknown; items?: unknown; content?: unknown };
      const candidates = data.data ?? data.items ?? data.content;
      if (Array.isArray(candidates)) {
        return candidates.map(normalize) as Address[];
      }
    }
    return [];
  }

}
