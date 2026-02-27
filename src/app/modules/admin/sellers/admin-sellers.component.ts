import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminDataService, AdminSeller } from '../../../services/admin-data.service';

@Component({
  selector: 'app-admin-sellers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.scss']
})
export class AdminSellersComponent implements OnInit {
  sellers: AdminSeller[] = [];

  selectedSeller: AdminSeller | null = null;
  draftSeller: AdminSeller | null = null;

  constructor(private adminData: AdminDataService) {}

  ngOnInit() {
    this.adminData.getSellers().subscribe((sellers) => {
      this.sellers = sellers;
    });
  }

  selectSeller(seller: AdminSeller) {
    this.selectedSeller = seller;
    this.draftSeller = { ...seller };
  }

  saveSeller() {
    if (!this.draftSeller) return;
    this.sellers = this.sellers.map((seller) =>
      seller.id === this.draftSeller?.id ? { ...this.draftSeller } : seller
    );
    this.selectedSeller = null;
    this.draftSeller = null;
  }

  toggleStatus() {
    if (!this.draftSeller) return;
    this.draftSeller.status = this.draftSeller.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
  }

  closeCard() {
    this.selectedSeller = null;
    this.draftSeller = null;
  }
}
