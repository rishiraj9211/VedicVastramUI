import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AddressService {

  private api = 'http://localhost:8080/buyer/address';

  constructor(private http: HttpClient) {}

  add(data: any) {
    return this.http.post(this.api, data);
  }

  list() {
    return this.http.get(this.api);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
