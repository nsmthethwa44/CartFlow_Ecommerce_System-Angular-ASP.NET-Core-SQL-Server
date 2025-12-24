import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [CommonModule, RouterLink],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News {
news: any = [
  { id: 1, imageUrl: "assets/img/blog-1.jpg"},
  { id: 2, imageUrl: "assets/img/blog-2.jpg"},
  { id: 3, imageUrl: "assets/img/blog-3.jpg"},
  { id: 4, imageUrl: "assets/img/blog-4.jpg"},
]
}
