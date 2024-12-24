import { HttpClient, HttpParams } from '@angular/common/http';
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

  getTransactionsFromUser(id: string, year: number | null | undefined, month: number | null | undefined): Observable<any> {
    let url = `${this.API}/Transaction/fromUser/${id}`;

    const params: { [key: string]: string | number } = {};
    if (year) {
      params['year'] = year;
    }
    if (month) {
      params['month'] = month;
    }

    const httpParams = new HttpParams({ fromObject: params });

    return this.http.get<any>(url, { params: httpParams });
  }

  getMonthInfo(id: string, year: number | null | undefined, month: number | null | undefined): Observable<any> {
    let url = `${this.API}/Transaction/fromUser/${id}/monthInfo`;

    const params: { [key: string]: string | number } = {};
    if (year) {
      params['year'] = year;
    }
    if (month) {
      params['month'] = month;
    }

    const httpParams = new HttpParams({ fromObject: params });

    return this.http.get<any>(url, { params: httpParams });
  }

}
