import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthServiceComponent } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthServiceComponent, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const isAuth = this.authService.getAuthStatus();
        if (!isAuth) {
            this.router.navigate(['/login']);
        }
        return isAuth;
    }

}
