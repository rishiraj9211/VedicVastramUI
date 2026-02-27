import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SellerCatalogProduct {
  id: number;
  title: string;
  description?: string;
  price: number;
  brand?: string;
  color?: string;
  fabric?: string;
  availableSizes?: string;
  quantity?: number;
  status?: string;
  imageUrls?: string[];
}

const STORAGE_KEY = 'seller_products';

@Injectable({ providedIn: 'root' })
export class SellerProductService {
  private productsSubject = new BehaviorSubject<SellerCatalogProduct[]>(this.load());
  products$ = this.productsSubject.asObservable();
  getSnapshot() {
    return this.productsSubject.value;
  }

  add(product: SellerCatalogProduct) {
    const products = [product, ...this.productsSubject.value];
    this.persist(products);
  }

  update(updated: SellerCatalogProduct) {
    const products = this.productsSubject.value.map((item) =>
      item.id === updated.id ? updated : item
    );
    this.persist(products);
  }

  private persist(products: SellerCatalogProduct[]) {
    this.productsSubject.next(products);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }

  private load(): SellerCatalogProduct[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as SellerCatalogProduct[];
    } catch {
      return [];
    }
  }
}
