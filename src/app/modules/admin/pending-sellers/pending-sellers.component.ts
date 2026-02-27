import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-sellers.html',
  styleUrls: ['./pending-sellers.scss']
})
export class PendingSellersComponent implements OnInit {
  private api = 'http://localhost:8080/admin/sellers/pending';
  private approveApi = 'http://localhost:8080/admin/sellers';
  private rejectApi = 'http://localhost:8080/admin/sellers';

  sellers: any[] = [];
  approvingId: number | null = null;
  rejectingId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get(this.api).subscribe((res) => {
      this.sellers = res as any[];
      if (!this.sellers.length) {
        this.sellers = this.mockSellers();
      }
    }, () => {
      this.sellers = this.mockSellers();
    });
  }

  approveSeller(id: number) {
    this.approvingId = id;
    this.http.post(`${this.approveApi}/${id}/approve`, null).subscribe({
      next: () => {
        this.sellers = this.sellers.filter((seller) => seller.id !== id);
        this.approvingId = null;
      },
      error: () => {
        this.approvingId = null;
      }
    });
  }

  rejectSeller(id: number) {
    this.rejectingId = id;
    this.http.post(`${this.rejectApi}/${id}/reject`, null).subscribe({
      next: () => {
        this.sellers = this.sellers.filter((seller) => seller.id !== id);
        this.rejectingId = null;
      },
      error: () => {
        this.rejectingId = null;
      }
    });
  }

  private mockSellers() {
    return [
      { id: 901, name: 'Ritu Textiles', email: 'ritu@store.com', storeName: 'Ritu Textiles' },
      { id: 902, name: 'Vedic Crafts', email: 'vedic@store.com', storeName: 'Vedic Crafts' }
    ];
  }
}
