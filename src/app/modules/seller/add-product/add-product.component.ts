import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerProductService } from '../../../services/seller-product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.scss']
})
export class AddProductComponent {
  private api = 'http://localhost:8080/seller/products';

  saving = false;
  product = {
    title: '',
    description: '',
    price: 0,
    brand: '',
    color: '',
    fabric: '',
    availableSizes: '',
    quantity: 0,
    imageUrls: [] as string[]
  };

  imageUrlInput = '';

  constructor(
    private http: HttpClient,
    private sellerProducts: SellerProductService
  ) {}

  save() {
    this.product.imageUrls = this.imageUrlInput
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
    this.saving = true;
    this.http.post(this.api, this.product).subscribe({
      next: () => {
        this.persistLocal();
        this.resetForm();
      },
      error: () => {
        this.persistLocal();
        this.resetForm();
      }
    });
  }

  private persistLocal() {
    this.sellerProducts.add({
      id: Date.now(),
      title: this.product.title,
      description: this.product.description,
      price: this.product.price,
      brand: this.product.brand,
      color: this.product.color,
      fabric: this.product.fabric,
      availableSizes: this.product.availableSizes,
      quantity: this.product.quantity,
      status: 'PENDING',
      imageUrls: this.product.imageUrls
    });
  }

  private resetForm() {
    this.product = {
      title: '',
      description: '',
      price: 0,
      brand: '',
      color: '',
      fabric: '',
      availableSizes: '',
      quantity: 0,
      imageUrls: []
    };
    this.imageUrlInput = '';
    this.saving = false;
  }
}
