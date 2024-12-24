import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private readonly API = environment.url.api; 
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<{ err: boolean; count: number; data: any[] }>(`${this.API}/User`)
  }

  getUserId(id: string): Observable<any> {
    return this.http.get<any>(`${this.API}/User/poor/${id}`)
  }

  getTransactionsFromUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.API}/Transaction/fromUser/${id}`)
  }
  
}
