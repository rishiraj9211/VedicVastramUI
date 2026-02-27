import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../models/product.model';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-buyer-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buyer-wishlist.component.html',
  styleUrls: ['./buyer-wishlist.component.scss']
})
export class BuyerWishlistComponent implements OnInit {
  items: Product[] = [];

  constructor(private wishlist: WishlistService) {}

  ngOnInit() {
    this.items = this.wishlist.list();
  }

  remove(item: Product) {
    this.wishlist.toggle(item);
    this.items = this.wishlist.list();
  }
}
