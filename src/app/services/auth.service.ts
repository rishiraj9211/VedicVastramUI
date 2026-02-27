import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'http://localhost:8080/auth';
  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(this.api + '/login', data, { responseType: 'text' });
  }

  register(data: any) {
    return this.http.post(this.api + '/register', data, { responseType: 'text' });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.authState.next(true);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodeRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.authState.next(false);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
