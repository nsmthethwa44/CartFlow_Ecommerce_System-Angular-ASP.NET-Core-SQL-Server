import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '../../auth/services/auth';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { WishListItem } from '../../models/wishlistItem';
import { WishlistService } from '../../services/wishlist-service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist {
 items: WishListItem[] = [];
  total = 0;
  private baseUrl = environment.apiUrl;
  constructor(private wishlistSvc: WishlistService, private auth: Auth, private router: Router, 
    private cartSvc: CartService ) {}

ngOnInit() {
  if (this.auth.isLoggedIn) {
    this.wishlistSvc.getDbWishList().subscribe(res => {
      this.items = res;
      this.calculateTotal();
    });
  } else {
    this.wishlistSvc.hydrateLocalWishList().subscribe(res => {
      this.items = res;
      this.calculateTotal();
    });
  }
}

  calculateTotal() {
    this.total = this.items.reduce(
      (sum, i) => sum + i.price * i.quantity, 0
    );
  }

remove(productId: number) {
  if (this.auth.isLoggedIn) {
    this.wishlistSvc.removeFromDbWishList(productId).subscribe(() => {
      this.items = this.items.filter(x => x.productId !== productId);
      this.calculateTotal();
    });
  } else {
    const wishList = this.wishlistSvc.getLocalWishList().filter(x => x.productId !== productId);
    localStorage.setItem('wishList', JSON.stringify(wishList));
    this.items = this.items.filter(x => x.productId !== productId);
    this.wishlistSvc['updateCount'](wishList); // or expose a method
    this.calculateTotal();
  }
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

addToCart(productId: number) {
  if (!this.auth.isLoggedIn) {
    this.cartSvc.addToLocalCart(productId);
  } else {
    this.cartSvc.addToDbCart({ productId, quantity: 1 }).subscribe();
  }
}

}
