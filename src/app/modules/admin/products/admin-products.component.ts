import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface AdminProduct {
  id: number;
  title: string;
  brand: string;
  price: number;
  quantity: number;
  sellerName: string;
}

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {
  products: AdminProduct[] = [
    {
      id: 3001,
      title: 'Ajrakh Print Saree',
      brand: 'Riwaaz',
      price: 2899,
      quantity: 18,
      sellerName: 'Ritu Textiles'
    },
    {
      id: 3002,
      title: 'Chikankari Kurti',
      brand: 'Indika',
      price: 1499,
      quantity: 8,
      sellerName: 'Vedic Crafts'
    },
    {
      id: 3003,
      title: 'Handloom Dupatta',
      brand: 'Vedic Looms',
      price: 799,
      quantity: 30,
      sellerName: 'Riwaaz Studio'
    }
  ];

  selectedProduct: AdminProduct | null = null;
  draftProduct: AdminProduct | null = null;
  error = '';

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
