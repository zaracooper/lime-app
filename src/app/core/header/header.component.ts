import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CartService } from 'src/app/data/services/cart.service';
import { SessionService } from '../authentication/session.service';
import { HeaderService } from './header.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartAmount: number = 0;

  isLoggedIn: boolean = false;
  showButtons: boolean = true;

  constructor(
    private _session: SessionService,
    private _snackBar: MatSnackBar,
    private _cart: CartService,
    private _header: HeaderService
  ) { }

  ngOnInit() {
    this._session.isCustomerLoggedIn()
      .subscribe(
        () => {
          this.isLoggedIn = true;
          this._session.setLoggedInStatus(true);
        }
      );

    this._session.loggedInStatus.subscribe(status => this.isLoggedIn = status);

    this._header.showHeaderButtons.subscribe(visible => this.showButtons = visible);

    this._cart.cartValue.subscribe(cart => this.cartAmount = cart.itemCount);
  }

  logout() {
    this._session.logout()
      .subscribe(
        () => {
          this._snackBar.open('You have been logged out.', 'Close', { duration: 4000 });
          this._session.setLoggedInStatus(false);
        },
        err => this._snackBar.open('There was a problem logging you out.', 'Close', { duration: 4000 })
      );
  }
}
