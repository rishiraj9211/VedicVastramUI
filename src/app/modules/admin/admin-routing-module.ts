import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './users/admin-users.component';
import { AdminSellersComponent } from './sellers/admin-sellers.component';
import { AdminAnalyticsComponent } from './analytics/admin-analytics.component';
import { AdminProductsComponent } from './products/admin-products.component';
import { PendingProductsComponent } from './pending-products/pending-products.component';
import { PendingSellersComponent } from './pending-sellers/pending-sellers.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'users', component: AdminUsersComponent },
  { path: 'sellers', component: AdminSellersComponent },
  { path: 'analytics', component: AdminAnalyticsComponent },
  { path: 'products', component: AdminProductsComponent },
  { path: 'pending-products', component: PendingProductsComponent },
  { path: 'pending-sellers', component: PendingSellersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
