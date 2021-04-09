import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { filter, pairwise } from 'rxjs/operators';
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
  @Input() cartAmount: number = 0;

  isLoggedIn: boolean = false;
  showButtons: boolean = true;

  constructor(
    private _session: SessionService,
    private _snackBar: MatSnackBar,
    private _cart: CartService,
    private _headerService: HeaderService
  ) { }

  ngOnInit() {
    this._session.loggedInStatus.subscribe(status => this.isLoggedIn = status);
    this._headerService.showHeaderButtons.subscribe(visible => this.showButtons = visible);
  }

  isCustomerLoggedIn() {
    this._session.isCustomerLoggedIn()
      .subscribe(
        () => this.isLoggedIn = true
      );
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
