import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
    | any {
      //getting "clean" info from token
    const token: string | null = localStorage.getItem('token');
    if (token) {
      const user: any = jwt_decode(token);
      if (user.exp > Date.now()) {
        return true;
      }
    } else {
      alert('You must be logged in to access this page');
      return false;
    }
  }
}
