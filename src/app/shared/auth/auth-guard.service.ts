import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   let isAuth = this.authService.isAuthenticated();
  //   if (!isAuth) {
  //     this.router.navigate(['/pages/login']);
  //   }
  //   else {
  //     return true;
  //   }
  // }
  canActivate(): Observable<boolean> {

    return this.auth.auth$.pipe(
      pluck('access_token'),
      map(token => {
        if (token) {
          return true;
        }
        this.router.navigate(['/pages/homepage']).then();
        return false;
      })
    );
  }
}
