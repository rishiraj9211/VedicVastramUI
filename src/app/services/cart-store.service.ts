import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LocalCartItem {
  id: number;
  productId: number;
  title?: string;
  price?: number;
  imageUrl?: string;
  size?: string;
  availableSizes?: string;
  quantity: number;
}

const STORAGE_KEY = 'cart_items';

@Injectable({ providedIn: 'root' })
export class CartStoreService {
  private itemsSubject = new BehaviorSubject<LocalCartItem[]>(this.load());
  items$ = this.itemsSubject.asObservable();

  add(item: Omit<LocalCartItem, 'id'>) {
    const items = [...this.itemsSubject.value];
    const existing = items.find(
      (entry) => entry.productId === item.productId && entry.size === item.size
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.unshift({ ...item, id: Date.now() });
    }
    this.persist(items);
  }

  update(id: number, changes: Partial<LocalCartItem>) {
    const items = this.itemsSubject.value.map((entry) =>
      entry.id === id ? { ...entry, ...changes } : entry
    );
    this.persist(items);
  }

  remove(id: number) {
    const items = this.itemsSubject.value.filter((entry) => entry.id !== id);
    this.persist(items);
  }

  getSnapshot() {
    return this.itemsSubject.value;
  }

  private persist(items: LocalCartItem[]) {
    this.itemsSubject.next(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  private load(): LocalCartItem[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as LocalCartItem[];
    } catch {
      return [];
    }
  }
}
