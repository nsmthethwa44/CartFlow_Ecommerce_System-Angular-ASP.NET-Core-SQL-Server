import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
news: any = [
  { id: 1, imageUrl: "assets/img/blog-1.jpg"},
  { id: 2, imageUrl: "assets/img/blog-2.jpg"},
  { id: 3, imageUrl: "assets/img/blog-3.jpg"},
  { id: 4, imageUrl: "assets/img/blog-4.jpg"},
  { id: 5, imageUrl: "assets/img/blog-5.jpg"},
  { id: 6, imageUrl: "assets/img/blog-6.jpg"},
  { id: 7, imageUrl: "assets/img/blog-7.jpg"},
  { id: 8, imageUrl: "assets/img/blog-8.jpg"},
]
}
