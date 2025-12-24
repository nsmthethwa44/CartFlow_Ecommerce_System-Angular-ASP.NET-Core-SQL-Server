import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../../services/category-service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-add-categories-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-add-categories-component.html',
  styleUrl: './admin-add-categories-component.scss',
})
export class AdminAddCategoriesComponent{
@Input() isVisible = false;
@Output() categoryCreated = new EventEmitter<void>();
form!: FormGroup;
selectedFile: File | null = null;

constructor(private categorySvc: CategoryService, private fb: FormBuilder){};

closeAddCategory(){
  this.isVisible = false;
}

ngOnInit(): void {
  this.form = this.fb.group({
    name: ['', Validators.required],
     image: [null],
  })
}
  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

addCategory(){
  if(this.form.invalid) return;

    Swal.fire({
        title: 'Adding Category...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading()
      });

  const formData = new FormData();
   formData.append("name", this.form.value.name);
  if(this.selectedFile) formData.append("ImageUrl", this.selectedFile);

  this.categorySvc.addCategory(formData).subscribe({
      next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Successfully Created!',
                text: 'New category successfully created.',
                timer: 2000,
                showConfirmButton: false
              });
              this.closeAddCategory();
              this.categoryCreated.emit();
            },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Creating category failed',
          text: 'Please try again later.',
          timer: 2000,
          showConfirmButton: false
        });
      }
  })
}
}
