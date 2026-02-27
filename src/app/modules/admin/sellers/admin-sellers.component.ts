import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type SellerStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';

interface AdminSeller {
  id: number;
  name: string;
  storeName: string;
  email: string;
  phone: string;
  status: SellerStatus;
  city: string;
}

@Component({
  selector: 'app-admin-sellers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-sellers.component.html',
  styleUrls: ['./admin-sellers.component.scss']
})
export class AdminSellersComponent {
  sellers: AdminSeller[] = [
    {
      id: 201,
      name: 'Ritu Textiles',
      storeName: 'Ritu Textiles',
      email: 'ritu@store.com',
      phone: '+91 98765 21001',
      status: 'ACTIVE',
      city: 'Jaipur'
    },
    {
      id: 202,
      name: 'Vedic Crafts',
      storeName: 'Vedic Crafts',
      email: 'vedic@store.com',
      phone: '+91 98765 21002',
      status: 'INACTIVE',
      city: 'Delhi'
    },
    {
      id: 203,
      name: 'Riwaaz',
      storeName: 'Riwaaz Studio',
      email: 'riwaaz@store.com',
      phone: '+91 98765 21003',
      status: 'ACTIVE',
      city: 'Mumbai'
    }
  ];

  selectedSeller: AdminSeller | null = null;
  draftSeller: AdminSeller | null = null;

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
