import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  issuer: any;
  baseUrl: string;
  constructor(private cookieService: CookieService) {
    this.baseUrl = environment.base;
    this.issuer = {
      films: `http://localhost:4200/content`,
    };
  }

  handleData(token: any): void {
    this.cookieService.set('auth_token', token);
  }

  getToken(): string {
    return this.cookieService.get('auth_token');
  }

  isValidToken(): any {
    const token = this.getToken();
    if (token) {
      const payload: any = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      } else {
        return false;
      }
    }
  }

  payload(token: string): any {
    return token.split('.')[0];
  }

  isLoggedIn(): any {
    return this.isValidToken();
  }
  removeToken(): void {
    this.cookieService.delete('auth_token');
  }
}
