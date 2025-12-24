import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category-service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories implements OnInit{
categories: Category[] = [];
isLoading = false;
private baseUrl = environment.apiUrl;
constructor(private categorySvc: CategoryService){};

getCategories(){
  this.isLoading = true;

  this.categorySvc.getCategories().subscribe({
    next: (res) =>{this.categories = res},
    error: (err) =>{console.log(err)},
    complete: ()=>{this.isLoading = false}
  })
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}

ngOnInit(): void {
  this.getCategories();
}
}
