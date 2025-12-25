import { Component, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-service';
import { Auth } from '../../auth/services/auth';
import { WishlistService } from '../../services/wishlist-service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
@Input() product: any;
@Output() close = new EventEmitter(); // just trying this method
private baseUrl = environment.apiUrl;
constructor( private authSvc: Auth,
   private cartSvc: CartService, private wishlistSvc: WishlistService){};

closePopup(){
  this.close.emit();
}

  getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-01.jpeg"
}

  addToCart(productId: number) {
  if (!this.authSvc.isLoggedIn) {
    this.cartSvc.addToLocalCart(productId);
  } else {
    this.cartSvc.addToDbCart({ productId, quantity: 1 }).subscribe();
  }
}

addToWishLIst(productId: number) {
  if (!this.authSvc.isLoggedIn) {
    this.wishlistSvc.addToLocalWishList(productId);
  } else {
    this.wishlistSvc.addToDbWishList({ productId, quantity: 1 }).subscribe();
  }
}
}
