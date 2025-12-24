import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../models/product';
import { AdminAddProductComponent } from "../admin-add-product-component/admin-add-product-component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-products-component',
  imports: [CommonModule, AdminAddProductComponent],
  templateUrl: './admin-products-component.html',
  styleUrl: './admin-products-component.scss',
})
export class AdminProductsComponent implements OnInit{
date!: number;
isLoading = false;
isVisible = false;
private baseUrl = environment.apiUrl;
products: Product[] = [];

constructor(private productSvc: ProductService){};

toggleAddProduct(){
  this.isVisible = !this.isVisible;
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

getProducts(){
  this.isLoading = true;

    this.productSvc.getProducts().subscribe({
    next:(res) =>{ this.products = res },
    error: (error) =>{console.log(error)},
   complete: () =>{this.isLoading = false}
  })
}

ngOnInit(): void {
  this.date = Date.now();
  this.getProducts();
}

getDate(){
  return this.date;
}

deleteProduct(id: number){
    Swal.fire({
        title: 'Are you sure, you want to delete this product?',
        text: 'This action will permanently delete the product.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'Cancel'
      }).then(result => {
        if (result.isConfirmed) {
             Swal.fire({
                title: 'Deleting Product...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
              });
          this.productSvc.delete(id).subscribe({
            next: () => {
                   Swal.fire({
                        icon: 'success',
                        title: 'Product has been deleted',
                        timer: 1800,
                        showConfirmButton: false
                      });
                this.getProducts();
            },
            error: () => {
               Swal.fire({
                        icon: 'error',
                        title: 'Failed to delete product',
                        timer: 1800,
                        showConfirmButton: false
                      });
            }
          });
        }
      });
}
}
