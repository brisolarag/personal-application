import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private api: ApiService) {}

  login(id: string) {
    localStorage.setItem('userId', id);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }
  logout(): void {
    localStorage.removeItem('userId');
  }
}
