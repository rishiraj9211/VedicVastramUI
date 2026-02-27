import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminDataService, AdminProduct } from '../../../services/admin-data.service';

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

  products: AdminProduct[] = [];
  approvingId: number | null = null;

  constructor(private http: HttpClient, private adminData: AdminDataService) {}

  ngOnInit() {
    this.adminData.getPendingProducts().subscribe((data) => {
      this.products = data;
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

}
