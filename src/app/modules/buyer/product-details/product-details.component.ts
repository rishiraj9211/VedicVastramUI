import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  selectedSize = '';
  quantity = 1;

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
        if (!res) return;
        this.product = res;
        this.images = res.imageUrls ?? [];
        const sizes = this.getSizes();
        if (sizes.length) {
          this.selectedSize = sizes[0];
        }
      });
    }
  }

  addToCart() {
    if (!this.product?.id) return;
    const qty = Math.max(1, this.quantity || 1);
    this.cartService.add({ productId: this.product.id, quantity: qty }).subscribe();
  }

  addWishlist(product: Product) {
    this.wishlist.toggle(product);
  }

  getSizes() {
    return (this.product.availableSizes || '')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
}
