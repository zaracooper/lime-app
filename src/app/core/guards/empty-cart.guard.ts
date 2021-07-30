import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/data/services/cart.service';

@Injectable({
  providedIn: 'root'
})
export class EmptyCartGuard implements CanActivate {
  constructor(private cart: CartService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.cart.orderId) {
      if (this.cart.itemCount > 0) {
        return true;
      }
    }

    return this.router.parseUrl('/empty');
  }
}