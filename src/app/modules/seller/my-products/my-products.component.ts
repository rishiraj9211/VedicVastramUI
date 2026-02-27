import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-products.html',
  styleUrls: ['./my-products.scss']
})
export class MyProductsComponent implements OnInit {
  private api = 'http://localhost:8080/seller/products';

  products: any[] = [];

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

  private mockProducts() {
    return [
      {
        id: 7001,
        title: 'Handloom Dupatta',
        price: 899,
        status: 'APPROVED'
      },
      {
        id: 7002,
        title: 'Printed Anarkali',
        price: 2299,
        status: 'PENDING'
      }
    ];
  }
}
