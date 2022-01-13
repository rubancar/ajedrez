import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizatedGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    console.log(localStorage.getItem("currentUser"));
    if (localStorage.getItem("currentUser") != null && localStorage.getItem("currentUser") != '') {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
