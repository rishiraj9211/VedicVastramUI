import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerDataService, SellerProduct } from '../../../services/seller-data.service';
import { SellerCatalogProduct, SellerProductService } from '../../../services/seller-product.service';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-products.html',
  styleUrls: ['./my-products.scss']
})
export class MyProductsComponent implements OnInit {
  private api = 'http://localhost:8080/seller/products';

  products: SellerCatalogProduct[] = [];
  private apiProducts: SellerProduct[] = [];
  selectedProduct: SellerCatalogProduct | null = null;
  draftProduct: SellerCatalogProduct | null = null;
  error = '';

  constructor(
    private http: HttpClient,
    private sellerData: SellerDataService,
    private sellerProducts: SellerProductService
  ) {}

  ngOnInit() {
    this.sellerProducts.products$.subscribe((localProducts) => {
      this.products = this.mergeProducts(this.apiProducts, localProducts);
    });

    this.sellerData.getMyProducts().subscribe((products) => {
      this.apiProducts = products;
      this.products = this.mergeProducts(this.apiProducts, this.sellerProducts.getSnapshot());
    });
  }

  selectProduct(product: SellerProduct) {
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
    if ((this.draftProduct.quantity ?? 0) < 0) {
      this.error = 'Quantity must be zero or greater.';
      return;
    }
    const normalizedImages = Array.isArray(this.draftProduct.imageUrls)
      ? this.draftProduct.imageUrls
      : String(this.draftProduct.imageUrls || '')
          .split(',')
          .map((url) => url.trim())
          .filter((url) => url.length > 0);
    this.products = this.products.map((item) =>
      item.id === this.draftProduct?.id
        ? { ...this.draftProduct, imageUrls: normalizedImages }
        : item
    );
    this.sellerProducts.update({
      id: this.draftProduct.id,
      title: this.draftProduct.title,
      description: this.draftProduct.description,
      price: this.draftProduct.price,
      brand: this.draftProduct.brand,
      color: this.draftProduct.color,
      fabric: this.draftProduct.fabric,
      availableSizes: this.draftProduct.availableSizes,
      quantity: this.draftProduct.quantity,
      status: this.draftProduct.status,
      imageUrls: Array.isArray(this.draftProduct.imageUrls)
        ? this.draftProduct.imageUrls
        : String(this.draftProduct.imageUrls || '')
            .split(',')
            .map((url) => url.trim())
            .filter((url) => url.length > 0)
    });
    this.selectedProduct = null;
    this.draftProduct = null;
    this.error = '';
  }

  closeCard() {
    this.selectedProduct = null;
    this.draftProduct = null;
    this.error = '';
  }

  private mergeProducts(apiProducts: SellerProduct[], localProducts: SellerCatalogProduct[]) {
    const byId = new Map<number, SellerCatalogProduct>();
    apiProducts.forEach((product) =>
      byId.set(product.id, {
        id: product.id,
        title: product.title,
        price: product.price,
        status: product.status || 'PENDING',
        quantity: 0
      })
    );
    localProducts.forEach((local) => {
      byId.set(local.id, {
        id: local.id,
        title: local.title,
        price: local.price,
        status: local.status || 'PENDING',
        quantity: local.quantity,
        availableSizes: local.availableSizes,
        imageUrls: local.imageUrls
      });
    });
    return Array.from(byId.values());
  }
}
