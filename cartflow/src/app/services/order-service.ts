import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { OrderDto } from '../models/order';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class OrderService {
   private baseUrl = `${environment.apiUrl}/api/order`;
   constructor(private http: HttpClient){};

  //  place order 
   order(dto: OrderDto){
    return this.http.post(`${this.baseUrl}`, dto)
   }

  //  get all orders 
  getOrders(): Observable<OrderDto[]>{
    return this.http.get<OrderDto[]>(`${this.baseUrl}`)
  }
  
}
