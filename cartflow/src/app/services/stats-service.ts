import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Stats } from '../models/stats';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private baseUrl = `${environment.apiUrl}/api/stats`;
  constructor(private http: HttpClient){};

  // get stats 
  getDashboardStats(): Observable<Stats[]> {
  return this.http.get<Stats[]>(`${this.baseUrl}`);
}
}
