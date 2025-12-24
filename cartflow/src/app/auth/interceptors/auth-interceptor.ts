import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Auth } from '../services/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authSer: Auth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const user = this.authSer.getUserFromStorage();
    if (user && user.token) {
      const cloned = req.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
