import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { AuthData } from '../auth/auth.model';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceComponent {
  private token: string;
  private isAuthenticated = false;
  private tokenTimer: any;
  private userId: string;
  logoutTimer: any;
  private authServiceListner = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getStatus() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatus() {
    return this.authServiceListner.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post(BACKEND_URL + 'signup', authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password
    };
    this.http.post<{token: string, expirationIn: number, userId: string}>(BACKEND_URL + 'login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expirationIn = response.expirationIn;
          this.tokenTimer = setTimeout(() => {
            this.logoutUser();
          }, expirationIn * 1000);
          this.userId = response.userId;
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expirationIn * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
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
    this.userId = null;
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
        return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.userId = authInformation.userId;
        this.setAuthTimer(expiresIn / 1000);
        this.authServiceListner.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.logoutTimer = setTimeout(() => {
        this.logoutUser();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    if (!token && !expirationDate) {
        return;
    }
    return {
        token: token,
        expirationDate: new Date(expirationDate),
        userId: userId
    };
  }
}
