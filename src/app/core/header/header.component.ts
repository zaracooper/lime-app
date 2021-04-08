import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationStart, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { filter, pairwise } from 'rxjs/operators';
import { SessionService } from '../authentication/session.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  showButtons: boolean = true;

  constructor(
    private _session: SessionService,
    private _router: Router,
    private _snackBar: MatSnackBar) {
    this._router.events.pipe(
      filter(event => event instanceof NavigationStart),
      pairwise()
    ).subscribe((events: any) => {
      if (events[0].url == '/login' && events[1].url == '/') {
        this.isCustomerLoggedIn();
      } else if (events[1].url == '/login' || events[1].url == '/signup') {
        this.showButtons = false;
      } else {
        this.showButtons = true;
      }
    });
  }

  ngOnInit() {
    this.isCustomerLoggedIn();
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
          this.isLoggedIn = false;
        },
        err => this._snackBar.open('There was a problem logging you out.', 'Close', { duration: 4000 })
      );
  }

}
