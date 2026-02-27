import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'address', component: AddressComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'orders', component: OrdersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
