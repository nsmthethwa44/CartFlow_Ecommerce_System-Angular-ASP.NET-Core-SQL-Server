import { Component, Input } from '@angular/core';
import { Login } from "../../auth/login/login";
import { Register } from "../../auth/register/register";
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router'
import { CartService } from '../../services/cart-service';
import { Observable } from 'rxjs/internal/Observable';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import { Auth } from '../../auth/services/auth';

@Component({
  selector: 'app-main-header',
  imports: [Login, Register, RouterLink, RouterModule, CommonModule],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
})
export class MainHeader {
isLoginVisible = false;
isRegisterVisible = false;
isNavBarOpen = false;
cartCount$!: Observable<number>;
constructor(private cartSvc: CartService, private authSvc: Auth) {}
@Input() isVisible = false;

 isScrolled = false;


 @HostListener('window:scroll', [])
  onWindowScroll(){
    this.isScrolled = window.scrollY > 100;
    this.closeDashboardNav();
  }

ngOnInit() {
  this.cartCount$ = this.cartSvc.cartCount$;
}


// From login, I want to go to register
  showRegister() {
    this.isLoginVisible = false;
    this.isRegisterVisible = true;
  }

  // From register, I want to go back to login
  showLogin() {
    if(!this.authSvc.isLoggedIn){
        this.isRegisterVisible = false;
        this.isLoginVisible = !this.isLoginVisible;
    }else{
       this.isVisible = !this.isVisible;
    }
  }

  // Registered successfully, show login
  registrationSuccess() {
    this.isRegisterVisible = false;
    this.isLoginVisible = true;
  }

  logOut(){
    this.authSvc.logout();
    this.closeDashboardNav();
  }

  closeDashboardNav(){
    return this.isVisible = false;
  }

  toggleNavBar() {
    this.isNavBarOpen = !this.isNavBarOpen;
  }

  closeNavbar() {
    this.isNavBarOpen = false;
  }
}
