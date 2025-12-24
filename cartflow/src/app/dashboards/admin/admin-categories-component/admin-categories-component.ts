import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category-service';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../models/category';
import { AdminAddCategoriesComponent } from "../admin-add-categories-component/admin-add-categories-component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-categories-component',
  imports: [CommonModule, AdminAddCategoriesComponent],
  templateUrl: './admin-categories-component.html',
  styleUrl: './admin-categories-component.scss',
})
export class AdminCategoriesComponent implements OnInit {
date!: number;
categories: Category[] =[];
isLoading = false;
isVisible = false;
private baseUrl = environment.apiUrl;

constructor(private categorySvc: CategoryService){};

getCategories(){
  this.isLoading = true;

  this.categorySvc.getCategories().subscribe({
    next:(res) =>{ this.categories = res },
    error: (error) =>{console.log(error)},
   complete: () =>{this.isLoading = false}
  })
}

ngOnInit(): void {
  this.date = Date.now();
  this.getCategories();
}

getDate(){
  return this.date;
}

toggleAddCategory(){
  this.isVisible = !this.isVisible;
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

deleteCategory(id: number){
  Swal.fire({
      title: 'Are you sure, you want to delete this category?',
      text: 'This action will permanently delete the category.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
           Swal.fire({
              title: 'Deleting Category...',
              allowOutsideClick: false,
              didOpen: () => Swal.showLoading()
            });
        this.categorySvc.delete(id).subscribe({
          next: () => {
                 Swal.fire({
                      icon: 'success',
                      title: 'Category has been deleted',
                      timer: 1800,
                      showConfirmButton: false
                    });
              this.getCategories();
          },
          error: () => {
             Swal.fire({
                      icon: 'error',
                      title: 'Failed to delete category',
                      timer: 1800,
                      showConfirmButton: false
                    });
          }
        });
      }
    });
}
}
