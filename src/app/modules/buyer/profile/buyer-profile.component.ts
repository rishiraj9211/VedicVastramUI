import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buyer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buyer-profile.component.html',
  styleUrls: ['./buyer-profile.component.scss']
})
export class BuyerProfileComponent {
  editing = false;
  error = '';

  profile = {
    name: 'Aditi Sharma',
    email: 'aditi@vedic.com',
    phone: '+91 98765 20001',
    addressLine: '142, Bapu Bazaar',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302003'
  };

  draft = { ...this.profile };

  startEdit() {
    this.draft = { ...this.profile };
    this.editing = true;
    this.error = '';
  }

  cancelEdit() {
    this.editing = false;
    this.error = '';
  }

  save() {
    if (!this.draft.name.trim()) {
      this.error = 'Name is required.';
      return;
    }
    if (!this.draft.email.trim()) {
      this.error = 'Email is required.';
      return;
    }
    this.profile = { ...this.draft };
    this.editing = false;
    this.error = '';
  }
}
