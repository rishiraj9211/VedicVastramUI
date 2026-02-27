import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AdminDataService, AdminSeller } from '../../../services/admin-data.service';

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

  sellers: AdminSeller[] = [];
  approvingId: number | null = null;
  rejectingId: number | null = null;

  constructor(private http: HttpClient, private adminData: AdminDataService) {}

  ngOnInit() {
    this.adminData.getPendingSellers().subscribe((data) => {
      this.sellers = data;
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

}
