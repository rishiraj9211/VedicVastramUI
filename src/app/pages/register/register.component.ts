import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role: 'BUYER' | 'SELLER' = 'BUYER';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.loading = true;
    this.error = '';
    this.auth
      .register({ name: this.name, email: this.email, password: this.password, role: this.role })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error: () => {
          this.error = 'Registration failed. Please try again.';
          this.loading = false;
        }
      });
  }
}
