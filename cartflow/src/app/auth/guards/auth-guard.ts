import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Auth } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authSer: Auth, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.authSer.getUserFromStorage()?.role  || null;

    if (userRole !== expectedRole) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
