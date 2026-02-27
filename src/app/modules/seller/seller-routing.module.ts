import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerAnalyticsComponent } from './analytics/seller-analytics.component';
import { SellerDashboardComponent } from './dashboard/seller-dashboard.component';
import { SellerOrdersComponent } from './orders/seller-orders.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { SellerProfileComponent } from './profile/seller-profile.component';

const routes: Routes = [
  { path: 'dashboard', component: SellerDashboardComponent },
  { path: 'analytics', component: SellerAnalyticsComponent },
  { path: 'orders', component: SellerOrdersComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'my-products', component: MyProductsComponent },
  { path: 'profile', component: SellerProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
