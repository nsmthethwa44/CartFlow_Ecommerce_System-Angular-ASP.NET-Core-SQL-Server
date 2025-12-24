import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { Auth } from '../../auth/services/auth';
import { CartItem } from '../../models/cartItem';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Login } from '../../auth/login/login';
import { Register } from '../../auth/register/register';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, Login, Register],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
 items: CartItem[] = [];
  total = 0;
  private baseUrl = environment.apiUrl;
  constructor(private cartSvc: CartService, private auth: Auth, private router: Router ) {}
  isLoginVisible = false;
isRegisterVisible = false;

ngOnInit() {
  if (this.auth.isLoggedIn) {
    this.cartSvc.getDbCart().subscribe(res => {
      this.items = res;
      this.calculateTotal();
    });
  } else {
    this.cartSvc.hydrateLocalCart().subscribe(res => {
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
    this.cartSvc.removeFromDbCart(productId).subscribe(() => {
      this.items = this.items.filter(x => x.productId !== productId);
      this.calculateTotal();
    });
  } else {
    const cart = this.cartSvc.getLocalCart().filter(x => x.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.items = this.items.filter(x => x.productId !== productId);
    this.cartSvc['updateCount'](cart); // or expose a method
    this.calculateTotal();
  }
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

checkout() {
  if (!this.auth.isLoggedIn) {
      this.showLogin();
  } else {
    this.router.navigate(['/checkout']);
  }
}


// From login, I want to go to register
  showRegister() {
    this.isLoginVisible = false;
    this.isRegisterVisible = true;
  }

  // From register, I want to go back to login
  showLogin() {
    this.isRegisterVisible = false;
    this.isLoginVisible = !this.isLoginVisible;
  }

  // Registered successfully, show login
  registrationSuccess() {
    this.isRegisterVisible = false;
    this.isLoginVisible = true;
  }

}
