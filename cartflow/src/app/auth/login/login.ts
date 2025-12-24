import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
@Input() isVisible = false;
@Output() switchToRegister = new EventEmitter<void>();
form!: FormGroup;

constructor(private authSvc: Auth, private fb: FormBuilder, private cartSvc: CartService){}

ngOnInit(): void {
  this.form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.min(5)]]
  })
}

login(){
  if (this.form.invalid) return;

   Swal.fire({
      title: 'Logging In...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

  const data = this.form.value;

   this.authSvc.login(data).subscribe({
        next: (res: any) => {
            Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in.',
          timer: 1800,
          showConfirmButton: false
        });
        this.mergeCartAfterLoginSuccess();
        },
        error: (err: any) => {
          console.log(err.error.details)
            setTimeout(() => {
              Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: err.error.details || 'Failed to log in.',
              timer: 1800,
              showConfirmButton: false
            });
    }, 3000); // Hide after 3s
        }
    })

}

 onClickRegister() {
    this.switchToRegister.emit();
  }

  closeLogin(){
    this.isVisible = false;
  }

  mergeCartAfterLoginSuccess() {
  const localCart = this.cartSvc.getLocalCart();
  if (localCart.length === 0) return;

  this.cartSvc.mergeCart(localCart).subscribe(() => {
    this.cartSvc.clearLocalCart();
  });
}



}
