import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { SessionService } from 'src/app/core/authentication/session.service';
import { CustomerAddress } from 'src/app/data/schema/customer-address';
import { CustomerAddressService } from 'src/app/data/services/customer-address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses: CustomerAddress[] = [];

  @Output() setAddressEvent = new EventEmitter<string>();

  constructor(
    private _session: SessionService,
    private _customerAddresses: CustomerAddressService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._session.loggedInStatus
      .pipe(
        first(),
        mergeMap(
          status => {
            if (status) {
              return this._customerAddresses.getCustomerAddresses();
            } else {
              return of([]);
            }
          }))
      .subscribe(
        addresses => {
          if (addresses.length) {
            this.addresses = addresses
          }
        },
        err => this._snackBar.open('There was a problem getting your existing addresses.', 'Close', { duration: 8000 })
      );
  }

  setAddress(change: MatRadioChange) {
    this.setAddressEvent.emit(change.value);
  }
}
