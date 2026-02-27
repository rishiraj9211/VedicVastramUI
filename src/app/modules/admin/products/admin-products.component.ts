import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminProduct } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  products: AdminProduct[] = [];

  selectedProduct: AdminProduct | null = null;
  draftProduct: AdminProduct | null = null;
  error = '';

  constructor(private adminData: AdminDataService) {}

  ngOnInit() {
    this.adminData.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  selectProduct(product: AdminProduct) {
    this.selectedProduct = product;
    this.draftProduct = { ...product };
    this.error = '';
  }

  saveProduct() {
    if (!this.draftProduct) return;
    if (!this.draftProduct.title.trim()) {
      this.error = 'Title is required.';
      return;
    }
    if (this.draftProduct.price < 0) {
      this.error = 'Price must be zero or greater.';
      return;
    }
    if (this.draftProduct.quantity < 0) {
      this.error = 'Quantity must be zero or greater.';
      return;
    }
    this.error = '';
    this.products = this.products.map((product) =>
      product.id === this.draftProduct?.id ? { ...this.draftProduct } : product
    );
    this.selectedProduct = null;
    this.draftProduct = null;
  }

  closeCard() {
    this.selectedProduct = null;
    this.draftProduct = null;
    this.error = '';
  }
}
