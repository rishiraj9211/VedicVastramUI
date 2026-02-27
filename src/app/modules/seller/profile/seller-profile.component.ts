import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent {
  profile = {
    name: 'Ritu Textiles',
    email: 'ritu@store.com',
    phone: '+91 98765 21001',
    status: 'ACTIVE',
    storeName: 'Ritu Textiles',
    gst: '07AABCU9603R1ZV',
    addressLine: '12, MI Road',
    city: 'Jaipur',
    state: 'Rajasthan',
    pincode: '302001'
  };
}
