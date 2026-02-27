import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  constructor(private http: HttpClient) {}

  save() {
    this.product.imageUrls = this.imageUrlInput
      .split(',')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
    this.saving = true;
    this.http.post(this.api, this.product).subscribe({
      next: () => {
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
      },
      error: () => {
        this.saving = false;
      }
    });
  }
}
