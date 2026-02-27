import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Address } from '../../../models/address.model';
import { AddressService } from '../../../services/address.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './address.html',
  styleUrls: ['./address.scss']
})
export class AddressComponent implements OnInit {
  addresses: Address[] = [];
  newAddress: Address = {
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: ''
  };

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.loadAddresses();
  }

  addAddress() {
    this.addressService.add(this.newAddress).subscribe(() => {
      this.newAddress = {
        fullName: '',
        phone: '',
        addressLine: '',
        city: '',
        state: '',
        pincode: ''
      };
      this.loadAddresses();
    });
  }

  removeAddress(id?: number) {
    if (!id) return;
    this.addressService.delete(id).subscribe(() => {
      this.addresses = this.addresses.filter((addr) => addr.id !== id);
    });
  }

  private loadAddresses() {
    this.addressService.list().subscribe((res) => {
      this.addresses = res as Address[];
    });
  }
}
