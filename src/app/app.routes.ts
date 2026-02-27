import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { BuyerGuard } from './guards/buyer.guard';
import { SellerGuard } from './guards/seller.guard';
import { AdminGuard } from './guards/admin.guard';

import { ProductsComponent } from './modules/buyer/products/products.component';
import { ProductDetailsComponent } from './modules/buyer/product-details/product-details.component';
import { CartComponent } from './modules/buyer/cart/cart.component';
import { AddressComponent } from './modules/buyer/address/address.component';
import { CheckoutComponent } from './modules/buyer/checkout/checkout.component';
import { OrdersComponent } from './modules/buyer/orders/orders.component';

import { SellerDashboardComponent } from './modules/seller/dashboard/seller-dashboard.component';
import { AddProductComponent } from './modules/seller/add-product/add-product.component';
import { MyProductsComponent } from './modules/seller/my-products/my-products.component';

import { AdminDashboardComponent } from './modules/admin/dashboard/admin-dashboard.component';
import { PendingSellersComponent } from './modules/admin/pending-sellers/pending-sellers.component';
import { PendingProductsComponent } from './modules/admin/pending-products/pending-products.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'buyer',
    canActivate: [AuthGuard, BuyerGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'address', component: AddressComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'orders', component: OrdersComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  },
  {
    path: 'seller',
    canActivate: [AuthGuard, SellerGuard],
    children: [
      { path: 'dashboard', component: SellerDashboardComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'my-products', component: MyProductsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'pending-sellers', component: PendingSellersComponent },
      { path: 'pending-products', component: PendingProductsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'buyer/products', pathMatch: 'full' },
  { path: '**', redirectTo: 'buyer/products' }
];
