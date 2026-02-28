import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private api = 'http://localhost:8080/products';
  private useMock = true;
  private mockProducts: Product[] = [
    {
      id: 1,
      title: 'Banarasi Silk Saree',
      description: 'Classic woven silk with zari work.',
      price: 349,
      availableSizes: 'Free',
      color: 'Red',
      brand: 'Vedic Looms',
      fabric: 'Silk',
      quantity: 10,
      sellerId: 101,
      status: 'APPROVED',
      imageUrls: ['/assets/images/products/vedic-looms.png']
    },
    {
      id: 2,
      title: 'Cotton Kurta Set',
      description: 'Breathable cotton kurta with palazzo.',
      price: 179,
      availableSizes: 'S,M,L,XL',
      color: 'Blue',
      brand: 'LV',
      fabric: 'Cotton',
      quantity: 25,
      sellerId: 102,
      status: 'APPROVED',
      imageUrls: ['/assets/images/products/aarohi.png']
    },
    {
      id: 3,
      title: 'Festive Lehenga',
      description: 'Embroidered lehenga for celebrations.',
      price: 599,
      availableSizes: 'M,L,XL',
      color: 'Maroon',
      brand: 'Riwaaz',
      fabric: 'Georgette',
      quantity: 5,
      sellerId: 103,
      status: 'APPROVED',
      imageUrls: ['/assets/images/products/riwaaz.png']
    }
  ];

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    if (this.useMock) {
      return of(this.mockProducts);
    }
    return this.http.get<unknown>(this.api).pipe(
      map((res) => this.normalizeProducts(res)),
      catchError(() => of(this.mockProducts))
    );
  }

  getById(id: number): Observable<Product | null> {
    if (this.useMock) {
      return of(this.mockProducts.find((item) => item.id === id) ?? null);
    }
    return this.http.get<unknown>(`${this.api}/${id}`).pipe(
      map((res) => this.normalizeProduct(res)),
      catchError(() => of(null))
    );
  }

  filter(params: any): Observable<Product[]> {
    if (this.useMock) {
      return of(this.mockProducts);
    }
    return this.http.get<unknown>(this.api + '/filter', { params }).pipe(
      map((res) => this.normalizeProducts(res)),
      catchError(() => of([]))
    );
  }

  private normalizeProducts(res: unknown): Product[] {
    if (Array.isArray(res)) {
      return res as Product[];
    }
    if (res && typeof res === 'object') {
      const data = res as { content?: unknown; data?: unknown; items?: unknown; products?: unknown };
      const candidates = data.content ?? data.data ?? data.items ?? data.products;
      if (Array.isArray(candidates)) {
        return candidates as Product[];
      }
    }
    return [];
  }

  private normalizeProduct(res: unknown): Product | null {
    if (!res) return null;
    if (Array.isArray(res)) {
      return (res[0] as Product) ?? null;
    }
    if (typeof res === 'object') {
      const data = res as { data?: unknown; item?: unknown; product?: unknown };
      const candidate = data.data ?? data.item ?? data.product ?? res;
      if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
        return candidate as Product;
      }
    }
    return null;
  }
}
