import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart-service';
import { CartItem } from '../../models/cartItem';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrderService } from '../../services/order-service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout implements OnInit{
   items: CartItem[] = [];
    total = 0;
    private baseUrl = environment.apiUrl;
    constructor(private cartSvc: CartService, private fb: FormBuilder, private orderSvc: OrderService) {}
    form!: FormGroup;

  getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

  calculateTotal() {
    this.total = this.items.reduce(
      (sum, i) => sum + i.price * i.quantity, 0
    );
  }


  getDbCart(){
    this.cartSvc.getDbCart().subscribe(res => {
          this.items = res;
          this.calculateTotal();
        });
  } 

    ngOnInit(): void {
      this.form = this.fb.group({
          userName: ["", [Validators.required]],
          userAddress: ["", [Validators.required]],
          userPhone: ["", [Validators.required]]
        }
      );
      this.getDbCart();
    }

    order(){
      if(this.form.invalid) return;

       Swal.fire({
            title: 'Creating Order...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
          });

      const data = this.form.value;
      this.orderSvc.order(data).subscribe({
      next: (res: any) => {
                Swal.fire({
              icon: 'success',
              title: 'Order Successful Placed',
              text: 'You have successfully placed an order.',
              timer: 1800,
              showConfirmButton: false
            });
            },
                   error: (err: any) => {
                        setTimeout(() => {
                          Swal.fire({
                          icon: 'error',
                          title: 'Creating Order Failed',
                          text: err.error.details || 'Failed to order.',
                          timer: 1800,
                          showConfirmButton: false
                        });
                }, 3000); // Hide after 3s
                    }
      })
    }

}
