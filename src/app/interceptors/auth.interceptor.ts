import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/auth-user/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.tokenService.getToken();
    if (request.headers.has('Content-Type')) {
      var contentType: any = request.headers.get('Content-Type');
    }
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type':
          contentType != 'application/json' ? 'application/text' : contentType,
      },
    });
    return next.handle(request);
  }
}
