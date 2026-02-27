import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private api = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api);
  }

  getById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  filter(params: any) {
    return this.http.get(this.api + '/filter', { params });
  }
}
