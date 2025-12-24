import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../../services/category-service';
import Swal from 'sweetalert2';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../../models/category';
import { ProductService } from '../../../services/product-service';

@Component({
  selector: 'app-admin-add-product-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-add-product-component.html',
  styleUrl: './admin-add-product-component.scss',
})
export class AdminAddProductComponent implements OnInit {
  @Input() isVisible = false;
  @Output() productCreated = new EventEmitter<void>();
  selectedFile: File | null = null;
  categories: Category[] = [];
  form!: FormGroup;

  constructor(
    private categorySvc: CategoryService,
    private fb: FormBuilder,
    private productSvc: ProductService
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  closeAddProduct() {
    this.isVisible = false;

  }

  getCategories() {
    this.categorySvc.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [Number, Validators.required],
      stock: [Number, Validators.required],
      price: [Number, Validators.required],
      Image: [null],
    });

    this.getCategories();
  }

  addProduct() {
    if (this.form.invalid) return;

    Swal.fire({
      title: 'Adding Product...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const formData = new FormData();
    formData.append('name', this.form.value.name);
    formData.append('description', this.form.value.description);
    formData.append('categoryId', this.form.value.categoryId);
    formData.append('stock', this.form.value.stock);
    formData.append('price', this.form.value.price);
    if (this.selectedFile) formData.append('ImageUrl', this.selectedFile);

    this.productSvc.addProduct(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Created!',
          text: 'New product successfully created.',
          timer: 2000,
          showConfirmButton: false,
        });
        this.closeAddProduct();
        this.productCreated.emit();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Creating Product failed',
          text: 'Please try again later.',
          timer: 2000,
          showConfirmButton: false,
        });
      },
    });
  }
}
