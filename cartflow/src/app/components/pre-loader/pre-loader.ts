import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pre-loader',
  imports: [CommonModule],
  templateUrl: './pre-loader.html',
  styleUrl: './pre-loader.scss',
})
export class PreLoader {
  @Input() isLoading = false;
}
