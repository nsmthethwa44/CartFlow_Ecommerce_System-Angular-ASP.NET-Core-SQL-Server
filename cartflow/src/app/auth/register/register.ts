import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
@Input() isVisible = false;
@Output() switchToLogin = new EventEmitter<void>();
@Output() registered = new EventEmitter<void>();
form!: FormGroup;
selectedFile: File | null = null;

closeRegisterForm(){
  this.registered.emit();
}

constructor(private authSvc: Auth, private fb: FormBuilder){};

ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(5)]],
      image: [null],
      role: "Customer"
    });
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  register(){
    if(this.form.invalid) return;

    Swal.fire({
      title: 'Creating account...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const formData = new FormData();
    formData.append("name", this.form.value.name);
    formData.append("email", this.form.value.email);
    formData.append("password", this.form.value.password);
    if (this.selectedFile) formData.append('ImageUrl', this.selectedFile);
    formData.append("role", this.form.value.role);

  this.authSvc.register(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Account Created!',
          text: 'You can now log in.',
          timer: 2000,
          showConfirmButton: false
        });
        this.closeRegisterForm();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: err.error?.message || 'Please try again later.',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });

  }

 onClickLogin() {
    this.switchToLogin.emit();
  }

  closeRegister(){
    this.isVisible = false;
  }
}
