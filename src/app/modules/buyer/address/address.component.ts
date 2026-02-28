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
  selectedAddress: Address | null = null;
  draftAddress: Address | null = null;
  error = '';

  constructor(private addressService: AddressService) {}

  ngOnInit() {
    this.loadAddresses();
  }

  addAddress() {
    if (!this.isAddressValid(this.newAddress)) {
      this.error = 'All fields are required.';
      return;
    }
    const payload: Address = {
      fullName: this.newAddress.fullName,
      phone: this.newAddress.phone,
      addressLine: this.newAddress.addressLine,
      city: this.newAddress.city,
      state: this.newAddress.state,
      pincode: this.newAddress.pincode
    };
    this.addressService.add(payload).subscribe({
      next: () => {
        this.error = '';
        this.newAddress = {
          fullName: '',
          phone: '',
          addressLine: '',
          city: '',
          state: '',
          pincode: ''
        };
        this.loadAddresses();
      },
      error: () => {
        this.error = 'Unable to save address right now.';
      }
    });
  }

  selectAddress(address: Address) {
    this.selectedAddress = address;
    this.draftAddress = { ...address };
    this.error = '';
  }

  saveAddress() {
    if (!this.draftAddress || !this.draftAddress.id) return;
    if (!this.draftAddress.fullName.trim()) {
      this.error = 'Name is required.';
      return;
    }
    const updated: Address = {
      id: this.draftAddress.id,
      fullName: this.draftAddress.fullName,
      phone: this.draftAddress.phone,
      addressLine: this.draftAddress.addressLine,
      city: this.draftAddress.city,
      state: this.draftAddress.state,
      pincode: this.draftAddress.pincode
    };
    this.addressService.update(this.draftAddress.id, updated).subscribe({
      next: () => {
        this.addresses = this.addresses.map((addr) =>
          addr.id === updated.id ? updated : addr
        );
        this.closeEditor();
      },
      error: () => {
        this.error = 'Unable to update address right now.';
      }
    });
  }

  closeEditor() {
    this.selectedAddress = null;
    this.draftAddress = null;
    this.error = '';
  }

  removeAddress(id?: number) {
    if (!id) return;
    this.addressService.delete(id).subscribe(() => {
      this.addresses = this.addresses.filter((addr) => addr.id !== id);
    });
  }

  private isAddressValid(address: Address) {
    return Boolean(
      address.fullName?.trim() &&
      address.phone?.trim() &&
      address.addressLine?.trim() &&
      address.city?.trim() &&
      address.state?.trim() &&
      address.pincode?.trim()
    );
  }

  private loadAddresses() {
    this.addressService.list().subscribe({
      next: (res) => {
        this.addresses = this.normalizeAddresses(res);
      },
      error: () => {
        this.addresses = [];
        this.error = 'Unable to load addresses right now.';
      }
    });
  }

  private normalizeAddresses(res: unknown): Address[] {
    const normalize = (addr: any): Address => ({
      id: addr.id ?? addr.addressId,
      fullName: addr.fullName,
      phone: addr.phone,
      addressLine: addr.addressLine,
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode
    });

    if (Array.isArray(res)) {
      return res.map(normalize) as Address[];
    }
    if (res && typeof res === 'object') {
      const data = res as {
        data?: unknown;
        items?: unknown;
        content?: unknown;
        addresses?: unknown;
        addressList?: unknown;
        addressDTOList?: unknown;
        addressDtoList?: unknown;
        addressDtos?: unknown;
      };
      const candidates =
        data.data ??
        data.items ??
        data.content ??
        data.addresses ??
        data.addressList ??
        data.addressDTOList ??
        data.addressDtoList ??
        data.addressDtos;
      if (Array.isArray(candidates)) {
        return candidates.map(normalize) as Address[];
      }
    }
    return [];
  }
}
