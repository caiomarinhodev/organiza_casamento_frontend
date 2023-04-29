import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { UserService } from '../service/user/user.service';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLogged()) {
      return true;
    }

    if (!window.location.href.includes('forgotpassword/changepassword?token=')) {
      this.router.navigate(['/login']);
    }
    return true;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLogged();
  }

}
