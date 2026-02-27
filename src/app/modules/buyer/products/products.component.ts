import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { WishlistService } from '../../../services/wishlist.service';

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
export class ProductsComponent implements OnInit {
  allProducts: Product[] = [];
  products: Product[] = [];
  paginatedProducts: Product[] = [];

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
    private productService: ProductService,
    private wishlist: WishlistService
  ) {}

  ngOnInit() {
    this.loadProducts();
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
      this.allProducts = res as Product[];
      if (!this.allProducts.length) {
        this.allProducts = this.mockProducts();
      }
      this.products = [...this.allProducts];
      this.updatePagination();
    }, () => {
      this.allProducts = this.mockProducts();
      this.products = [...this.allProducts];
      this.updatePagination();
    });
  }

  private updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.products.slice(start, end);
    this.totalPages = Math.max(1, Math.ceil(this.products.length / this.pageSize));
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
        imageUrls: ['https://via.placeholder.com/400x520?text=Silk+Saree']
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
        imageUrls: ['https://via.placeholder.com/400x520?text=Kurta+Set']
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
        imageUrls: ['https://via.placeholder.com/400x520?text=Lehenga']
      }
    ];
  }
}
