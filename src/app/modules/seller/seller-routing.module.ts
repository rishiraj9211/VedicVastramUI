import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerDashboardComponent } from './dashboard/seller-dashboard.component';
import { MyProductsComponent } from './my-products/my-products.component';

const routes: Routes = [
  { path: 'dashboard', component: SellerDashboardComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'my-products', component: MyProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
