import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/api/user`

  constructor(private http: HttpClient){};

  // get all users 
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}`)
  }
}
