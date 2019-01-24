import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { AuthData } from '../auth/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceComponent {
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private authServiceListner = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getStatus() {
    return this.isAuthenticated;
  }

  getAuthStatus() {
    return this.authServiceListner.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post<{token: string, expirationIn: number}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expirationIn = response.expirationIn;
          this.tokenTimer = setTimeout(() => {
            this.logoutUser();
          }, expirationIn * 1000);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expirationIn * 1000);
          this.saveAuthData(token, expirationDate);
          this.isAuthenticated = true;
          this.authServiceListner.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.authServiceListner.next(false);
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationIn', expirationDate.toISOString());
  }

  private clearData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationIn');
  }
}
