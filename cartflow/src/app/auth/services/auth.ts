import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  public baseUrl = `${environment.apiUrl}/api/auth`;
  constructor(private http: HttpClient, private router: Router ){}

   private currentUserSource = new BehaviorSubject<User | null>(this.getUserFromStorage());
  currentUser$ = this.currentUserSource.asObservable();

  register(data: FormData): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post<User>(`${this.baseUrl}/login`, data).pipe(
      map(user => {
        if (user && user.token) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
          this.redirectByRole(user.role)
        }
        return user;
      })
    );
  }

redirectByRole(role: string) {
  const lowerRole = role.toLowerCase();

  if (lowerRole === 'admin') {
    this.router.navigate(['/admin']); // Navigate to admin dashboard
  } else if (lowerRole === 'customer') {
    // this.router.navigate(['/customer']); // Uncomment and set the correct route for customers dashboard  
    this.router.navigate(['/']); // Temporary redirect to home  
  } else {
    this.router.navigate(['/']); // Default redirect to home  
  }
}
  
  getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  get isProfileComplete(): boolean {
    const u = this.getUserFromStorage();
    if (!u) return false;
    return !!(u.imageUrl);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

//   get isLoggedIn(): boolean {
//   return this.getUserFromStorage() !== null;
// }

get isLoggedIn(): boolean {
  return this.currentUserSource.value !== null;
}

}
