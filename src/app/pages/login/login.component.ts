import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.loading = true;
    this.error = '';
    this.auth
      .login({ email: this.email, password: this.password })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (token) => {
          this.auth.saveToken(token as string);
          const role = this.auth.decodeRole();
          if (role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else if (role === 'SELLER') {
            this.router.navigate(['/seller/dashboard']);
          } else {
            this.router.navigate(['/buyer/products']);
          }
        },
        error: () => {
          this.error = 'Invalid credentials. Please try again.';
        }
      });
  }
}
