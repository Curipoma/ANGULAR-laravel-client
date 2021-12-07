import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthUserService } from '../services/auth-user/auth-user.service';
import { TokenService } from '../services/auth-user/token.service';
import { User } from '../models/User.interface';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  user: User;
  constructor(
    private authUserService: AuthUserService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.user = {};
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.user = this.authUserService.getData();
    if (this.tokenService.getToken() && this.user) {
      if (this.user.rol === 1) {
        this.router.navigate(['films']);
        return false;
      }
      if (this.user.rol === 2) {
        this.router.navigate(['content']);
        return false;
      }
    }
    return true;
  }
}
