import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  constructor(
    private cookieService: CookieService,
    private tokenService: TokenService
  ) {}
  handleData(data: any): any {
    this.tokenService.handleData(data.token);
    this.cookieService.set('user-data', JSON.stringify(data.user[0]));
    return this.getData();
  }
  getData(): any {
    if (this.cookieService.get('user-data')) {
      return JSON.parse(this.cookieService.get('user-data'));
    }
  }
  removeCookie(): any {
    return this.cookieService.delete('user-data');
  }
}
