import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product-service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ProductDetails } from "../../components/product-details/product-details";
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { Auth } from '../../auth/services/auth';

@Component({
  selector: 'app-popular',
  imports: [CommonModule, ProductDetails, RouterLink],
  templateUrl: './popular.html',
  styleUrl: './popular.scss',
})
export class Popular implements OnInit{
isLoading = false;
private baseUrl = environment.apiUrl;
products: Product[] = [];
selectedProduct: any = null;

constructor(private productSvc: ProductService, private authSvc: Auth, private cartSvc: CartService){};

getProducts(){
  this.isLoading = true;

    this.productSvc.getProducts().subscribe({
    next:(res) =>{ this.products = res },
    error: (error) =>{console.log(error)},
   complete: () =>{this.isLoading = false}
  })
}

ngOnInit(): void {
  this.getProducts();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

  openProductDetailsPopup(product: any) {
    this.selectedProduct = product;
  }

  addToCart(productId: number) {
  if (!this.authSvc.isLoggedIn) {
    this.cartSvc.addToLocalCart(productId);
  } else {
    this.cartSvc.addToDbCart({ productId, quantity: 1 }).subscribe();
  }
}
}
