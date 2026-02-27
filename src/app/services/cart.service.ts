import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CartService {

  private api = 'http://localhost:8080/buyer/cart';

  constructor(private http: HttpClient) {}

  add(data: any) {
    return this.http.post(this.api + '/add', data);
  }

  list() {
    return this.http.get(this.api);
  }

  update(itemId: number, qty: number) {
    return this.http.put(this.api + '/update', null,
      { params: { itemId, qty } }
    );
  }

  remove(id: number) {
    return this.http.delete(`${this.api}/remove/${id}`);
  }
}
