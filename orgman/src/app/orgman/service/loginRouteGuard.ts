import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authenticationService';

@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(public authenticationService: AuthenticationService, public router: Router) {}

  canActivate(): boolean {
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['login']);
      return true;
    }

    return true;
  }
}
