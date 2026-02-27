import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../models/cart.model';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.list().subscribe((res) => {
      this.items = res as CartItem[];
    });
  }

  removeItem(id: number) {
    this.cartService.remove(id).subscribe(() => {
      this.items = this.items.filter((item) => item.id !== id);
    });
  }
}
