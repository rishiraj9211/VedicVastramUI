import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { CartStoreService } from '../../../services/cart-store.service';
import { ProductService } from '../../../services/product.service';
import { WishlistService } from '../../../services/wishlist.service';
import { NotificationService } from '../../../services/notification.service';

interface ProductFilters {
  brand: string;
  color: string;
  fabric: string;
  size: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  allProducts: Product[] = [];
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  selectedSizes: Record<number, string> = {};
  selectedQty: Record<number, number> = {};
  private destroyed$ = new Subject<void>();
  private defaultImageUrl = 'https://share.google/wUvL0Wa2N3HuKNZdO';
  addingFeedback: Record<number, boolean> = {};

  page = 1;
  pageSize = 8;
  totalPages = 1;

  filters: ProductFilters = {
    brand: '',
    color: '',
    fabric: '',
    size: ''
  };

  brands = ['Vedic Looms', 'Aarohi', 'Riwaaz', 'Satrangi', 'Indika'];
  colors = ['Red', 'Blue', 'Maroon', 'Black', 'Green', 'Beige'];
  fabrics = ['Silk', 'Cotton', 'Georgette', 'Linen', 'Chiffon'];
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free'];

  constructor(
    private cartService: CartService,
    private cartStore: CartStoreService,
    private productService: ProductService,
    private wishlist: WishlistService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notifications: NotificationService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroyed$)
      )
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        if (nav.urlAfterRedirects.startsWith('/buyer/products')) {
          this.loadProducts();
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  applyFilters() {
    const { brand, color, fabric, size } = this.filters;
    this.products = this.allProducts.filter((product) => {
      const brandMatch = !brand || product.brand === brand;
      const colorMatch = !color || product.color === color;
      const fabricMatch = !fabric || product.fabric === fabric;
      const sizeMatch =
        !size ||
        product.availableSizes
          .split(',')
          .map((s) => s.trim())
          .includes(size);
      return brandMatch && colorMatch && fabricMatch && sizeMatch;
    });
    this.page = 1;
    this.updatePagination();
  }

  onSearch(q: string) {
    const needle = q.toLowerCase();
    const filtered = this.products.filter((p) =>
      p.title.toLowerCase().includes(needle)
    );
    this.paginatedProducts = filtered.slice(0, this.pageSize);
    this.totalPages = Math.max(1, Math.ceil(filtered.length / this.pageSize));
    this.page = 1;
  }

  addWishlist(product: Product) {
    this.wishlist.toggle(product);
  }

  addToCart(product: Product) {
    const sizes = this.getSizes(product);
    if (sizes.length > 0 && !this.selectedSizes[product.id]) {
      this.selectedSizes[product.id] = sizes[0];
    }
    const selectedSize = this.selectedSizes[product.id] || '';
    const qty = Math.max(1, this.selectedQty[product.id] ?? 1);
    this.cartService.add({ productId: product.id, quantity: qty }).subscribe({
      next: () => {
        this.cartStore.add({
          productId: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrls?.[0],
          size: selectedSize,
          availableSizes: product.availableSizes,
          quantity: qty
        });
        this.triggerAddFeedback(product.id);
      },
      error: () => {
        this.cartStore.add({
          productId: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrls?.[0],
          size: selectedSize,
          availableSizes: product.availableSizes,
          quantity: qty
        });
        this.triggerAddFeedback(product.id);
      }
    });
  }

  isWishlisted(product: Product) {
    return this.wishlist.has(product.id);
  }

  getSizes(product: Product) {
    return (product.availableSizes || '')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }

  getSelectedSize(product: Product) {
    return this.selectedSizes[product.id] || this.getSizes(product)[0] || '';
  }

  setSelectedSize(product: Product, size: string) {
    this.selectedSizes[product.id] = size;
  }

  getQty(product: Product) {
    return this.selectedQty[product.id] ?? 1;
  }

  setQty(product: Product, qty: number) {
    this.selectedQty[product.id] = Math.max(1, qty || 1);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page += 1;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.updatePagination();
    }
  }

  private loadProducts() {
    this.productService.getAll().subscribe((res) => {
      this.allProducts = this.applyDefaultImage(this.normalizeProducts(res));
      if (!this.allProducts.length) {
        this.allProducts = this.mockProducts();
      }
      this.products = [...this.allProducts];
      this.page = 1;
      this.updatePagination();
      this.cdr.detectChanges();
    }, () => {
      this.allProducts = this.mockProducts();
      this.products = [...this.allProducts];
      this.page = 1;
      this.updatePagination();
      this.cdr.detectChanges();
    });
  }

  private updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.products.slice(start, end);
    this.totalPages = Math.max(1, Math.ceil(this.products.length / this.pageSize));
    if (this.page > this.totalPages) {
      this.page = 1;
      this.paginatedProducts = this.products.slice(0, this.pageSize);
    }
  }

  private mockProducts(): Product[] {
    return [
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

  private applyDefaultImage(products: Product[]): Product[] {
    return products.map((product) => ({
      ...product,
      imageUrls: [this.defaultImageUrl]
    }));
  }

  private triggerAddFeedback(productId: number) {
    this.addingFeedback[productId] = true;
    window.setTimeout(() => {
      this.addingFeedback[productId] = false;
    }, 500);

    this.notifications.show('Added to cart', { type: 'success', duration: 2000 });
  }
}
