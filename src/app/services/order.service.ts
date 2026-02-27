import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class OrderService {

  private api = 'http://localhost:8080/buyer/order';

  constructor(private http: HttpClient) {}

  checkout(data: any) {
    return this.http.post(this.api + '/checkout', data);
  }

  history() {
    return this.http.get(this.api + '/history');
  }
}
