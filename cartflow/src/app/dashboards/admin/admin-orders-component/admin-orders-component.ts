import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { OrderDto } from '../../../models/order';
import { OrderService } from '../../../services/order-service';

@Component({
  selector: 'app-admin-orders-component',
  imports: [CommonModule],
  templateUrl: './admin-orders-component.html',
  styleUrl: './admin-orders-component.scss',
})
export class AdminOrdersComponent implements OnInit {
date!: number;
isLoading = false;
baseUrl = environment.apiUrl;
orders: OrderDto[] = [];
constructor(private orderSvc: OrderService){}

  getDate(){
  return this.date;
}

getOrders(){
  this.isLoading = true;

  this.orderSvc.getOrders().subscribe({
    next: (res) =>{this.orders = res},
    error: (err) =>{console.log(err)},
    complete: () =>{this.isLoading = false}
  })
}

ngOnInit(): void {
  this.date = Date.now();
  this.getOrders();
}

getImageUrl(path: string | undefined): string{
  return path ? `${this.baseUrl}${path}` : "assets/img/img-1.jpg"
}
}
