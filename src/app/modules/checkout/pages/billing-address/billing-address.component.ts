import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';
import { of } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { SessionService } from 'src/app/core/authentication/session.service';
import { Address } from 'src/app/data/schema/address';
import { CustomerAddress } from 'src/app/data/schema/customer-address';
import { UpdateOrderParams } from 'src/app/data/schema/order';
import { AddressService } from 'src/app/data/services/address.service';
import { CartService } from 'src/app/data/services/cart.service';
import { CustomerAddressService } from 'src/app/data/services/customer-address.service';
import { OrderService } from 'src/app/data/services/order.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-billing-address',
  templateUrl: './billing-address.component.html',
  styleUrls: ['./billing-address.component.css']
})
export class BillingAddressComponent implements OnInit {
  addresses: CustomerAddress[] = [];
  showAddresses: boolean = false;
  sameShippingOrBillingAddress: boolean = false;

  constructor(
    private _addresses: AddressService,
    private _customerAddresses: CustomerAddressService,
    private _snackBar: MatSnackBar,
    private _session: SessionService,
    private _orders: OrderService,
    private _cart: CartService) { }

  ngOnInit() {
    this._session.loggedInStatus
      .pipe(first())
      .subscribe(
        status => this.showAddresses = status
      );
  }

  createAddress(address: Address) {
    this._addresses.createAddress(address)
      .pipe(
        mergeMap(address => {
          let updateParams = [UpdateOrderParams.billingAddress];
          if (this.sameShippingOrBillingAddress) {
            updateParams.push(UpdateOrderParams.shippingAddressSameAsBilling);
          }

          return this._orders.updateOrder({
            id: this._cart.orderId,
            billingAddressId: address.id
          }, updateParams);
        })
      )
      .subscribe({
        error: err => this._snackBar.open('There was a problem creating your address.', 'Close', { duration: 800 })
      });
  }

  private cloneAddress(id: string) {

  }

  private updateOrderObservable() {
  }

  setSameShippingOrBillingAddress(change: boolean) {
    this.sameShippingOrBillingAddress = change;
  }
}
