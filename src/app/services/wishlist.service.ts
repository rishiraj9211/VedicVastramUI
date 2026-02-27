import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'wishlist';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  list(): Product[] {
    return this.read();
  }

  has(productId: number) {
    return this.read().some((item) => item.id === productId);
  }

  toggle(product: Product) {
    const items = this.read();
    const index = items.findIndex((item) => item.id === product.id);
    if (index >= 0) {
      items.splice(index, 1);
    } else {
      items.push(product);
    }
    this.write(items);
  }

  private read(): Product[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Product[];
    } catch {
      return [];
    }
  }

  private write(items: Product[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}
