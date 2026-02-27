import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
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
  isMenuOpen = false;
  showSearch = false;
  private destroyed$ = new Subject<void>();

  constructor(public auth: AuthService, private router: Router) {
    this.updateRole();
  }

  ngOnInit() {
    this.auth.authState$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.updateRole();
    });

    this.updateSearchVisibility(this.router.url);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroyed$)
      )
      .subscribe((event) => {
        const nav = event as NavigationEnd;
        this.updateSearchVisibility(nav.urlAfterRedirects);
        this.closeMenu();
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
    this.isMenuOpen = false;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  private updateRole() {
    const role = this.auth.decodeRole();
    this.role = role === 'BUYER' || role === 'SELLER' || role === 'ADMIN' ? role : 'GUEST';
  }

  private updateSearchVisibility(url: string) {
    const searchableRoutes = [
      '/admin/users',
      '/admin/sellers',
      '/admin/products',
      '/admin/pending-sellers',
      '/admin/pending-products',
      '/buyer/products',
      '/seller/my-products'
    ];
    this.showSearch = searchableRoutes.some((route) => url.startsWith(route));
  }
}
