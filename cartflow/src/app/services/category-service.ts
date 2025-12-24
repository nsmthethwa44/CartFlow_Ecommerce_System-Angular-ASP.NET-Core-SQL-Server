import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/api/category`;

  constructor(private http: HttpClient){};

  // get all categories 
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  // adding new category 
  addCategory(data: FormData): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  // delete Category
  delete(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
