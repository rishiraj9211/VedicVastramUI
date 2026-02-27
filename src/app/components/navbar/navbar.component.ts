import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();

  query = '';
  role: 'BUYER' | 'SELLER' | 'ADMIN' | 'GUEST' = 'GUEST';
  private destroyed$ = new Subject<void>();

  constructor(public auth: AuthService, private router: Router) {
    this.updateRole();
  }

  ngOnInit() {
    this.auth.authState$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.updateRole();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout() {
    this.auth.logout();
    this.updateRole();
    this.router.navigate(['/login']);
  }

  private updateRole() {
    const role = this.auth.decodeRole();
    this.role = role === 'BUYER' || role === 'SELLER' || role === 'ADMIN' ? role : 'GUEST';
  }
}
