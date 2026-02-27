import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-products.html',
  styleUrls: ['./pending-products.scss']
})
export class PendingProductsComponent implements OnInit {
  private api = 'http://localhost:8080/admin/products/pending';
  private approveApi = 'http://localhost:8080/admin/products';

  products: any[] = [];
  approvingId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.api).subscribe((res) => {
      this.products = res as any[];
      if (!this.products.length) {
        this.products = this.mockProducts();
      }
    }, () => {
      this.products = this.mockProducts();
    });
  }

  approveProduct(id: number) {
    this.approvingId = id;
    this.http.post(`${this.approveApi}/${id}/approve`, null).subscribe({
      next: () => {
        this.products = this.products.filter((product) => product.id !== id);
        this.approvingId = null;
      },
      error: () => {
        this.approvingId = null;
      }
    });
  }

  private mockProducts() {
    return [
      { id: 3001, title: 'Ajrakh Print Saree', sellerId: 901, price: 2899 },
      { id: 3002, title: 'Chikankari Kurti', sellerId: 902, price: 1499 }
    ];
  }
}
