import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    availableSizes: '',
    color: '',
    brand: '',
    fabric: '',
    quantity: 0,
    sellerId: 0,
    status: ''
  };

  images: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private wishlist: WishlistService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getById(id).subscribe((res) => {
        this.product = res as Product;
        this.images = (res as any).imageUrls ?? [];
      });
    }
  }

  addToCart() {
    if (!this.product?.id) return;
    this.cartService.add({ productId: this.product.id, quantity: 1 }).subscribe();
  }

  addWishlist(product: Product) {
    this.wishlist.toggle(product);
  }
}
