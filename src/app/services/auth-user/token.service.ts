import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  issuer: any;
  constructor(private cookieService: CookieService) {
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
  removeToken(): void {
    this.cookieService.delete('auth_token');
  }
}
