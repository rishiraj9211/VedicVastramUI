import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({ providedIn: 'root' })
export class AddressService {

  private api = 'http://localhost:8080/buyer/address';
  private useMock = true;
  private storageKey = 'mock_buyer_addresses';

  constructor(private http: HttpClient) {}

  add(data: any) {
    if (this.useMock) {
      const next = this.insertMock(data as Address);
      return of(next);
    }
    return this.http.post(this.api, data).pipe(
      catchError((primaryErr) =>
        this.http.post(`${this.api}es`, data).pipe(
          catchError(() => this.http.post(`${this.api}/add`, data).pipe(
            catchError(() => throwError(() => primaryErr))
          ))
        )
      )
    );
  }

  list() {
    if (this.useMock) {
      return of(this.readMock());
    }
    return this.http.get(this.api).pipe(
      catchError((primaryErr) =>
        this.http.get(`${this.api}es`).pipe(
          catchError(() => this.http.get(`${this.api}/list`).pipe(
            catchError(() => throwError(() => primaryErr))
          ))
        )
      )
    );
  }

  update(id: number, data: any) {
    if (this.useMock) {
      const next = this.updateMock(id, data as Address);
      return of(next);
    }
    return this.http.put(`${this.api}/${id}`, data).pipe(
      catchError((primaryErr) =>
        this.http.put(`${this.api}es/${id}`, data).pipe(
          catchError(() => this.http.put(`${this.api}/update`, { id, ...data }).pipe(
            catchError(() => throwError(() => primaryErr))
          ))
        )
      )
    );
  }

  delete(id: number) {
    if (this.useMock) {
      this.removeMock(id);
      return of({ success: true });
    }
    return this.http.delete(`${this.api}/${id}`).pipe(
      catchError((primaryErr) =>
        this.http.delete(`${this.api}es/${id}`).pipe(
          catchError(() => this.http.delete(`${this.api}/remove/${id}`).pipe(
            catchError(() => throwError(() => primaryErr))
          ))
        )
      )
    );
  }

  private readMock(): Address[] {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Address[];
    } catch {
      return [];
    }
  }

  private writeMock(next: Address[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(next));
  }

  private insertMock(address: Address) {
    const addresses = this.readMock();
    const nextAddress: Address = {
      ...address,
      id: Date.now()
    };
    const next = [nextAddress, ...addresses];
    this.writeMock(next);
    return nextAddress;
  }

  private updateMock(id: number, address: Address) {
    const addresses = this.readMock();
    const next = addresses.map((item) =>
      item.id === id ? { ...address, id } : item
    );
    this.writeMock(next);
    return { ...address, id };
  }

  private removeMock(id: number) {
    const addresses = this.readMock();
    const next = addresses.filter((item) => item.id !== id);
    this.writeMock(next);
  }
}
