import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/api/product`;

  constructor(private http: HttpClient){};

  // get products 
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}`)
  }

  // create product 
  addProduct(data: FormData): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`, data)
  }

  // delete product 
  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
