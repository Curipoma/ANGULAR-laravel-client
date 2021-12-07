import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthUserService } from '../services/auth-user/auth-user.service';
import { TokenService } from '../services/auth-user/token.service';
import { User } from '../models/User.interface';

@Injectable({
  providedIn: 'root',
})
export class AccessClientGuardGuard implements CanActivate {
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
      if (this.user.rol === 1 && state.url === '/films') {
        return true;
      } else if (this.user.rol === 1) {
        this.router.navigate(['films']);
      }
      if (this.user.rol === 2 && state.url === '/content') {
        return true;
      } else if (this.user.rol === 2) {
        this.router.navigate(['content']);
      }
    }
    this.router.navigate(['login']);
    return false;
  }
}
