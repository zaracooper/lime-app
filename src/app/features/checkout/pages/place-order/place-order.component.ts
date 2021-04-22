import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { iif } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { GetOrderParams, UpdateOrderParams } from 'src/app/data/models/order';
import { CartService } from 'src/app/data/services/cart.service';
import { OrderService } from 'src/app/data/services/order.service';
import { PaypalPaymentService } from 'src/app/data/services/paypal-payment.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  disableButton = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _payments: PaypalPaymentService,
    private _orders: OrderService,
    private _cart: CartService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._route.queryParams
      .pipe(
        concatMap(params => {
          const payerId = params['PayerID'];
          const orderId = this._cart.orderId;

          return iif(
            () => payerId.length > 0,
            this._orders.getOrder(orderId, GetOrderParams.paymentSource)
              .pipe(
                concatMap(order => {
                  const paymentSourceId = order.paymentSource?.id || '';

                  return iif(
                    () => paymentSourceId ? paymentSourceId.length > 0 : false,
                    this._payments.updatePaypalPayment(paymentSourceId, payerId)
                  );
                })
              )
          );
        }))
      .subscribe(
        () => this.disableButton = false,
        () => this._router.navigateByUrl('/error')
      );
  }

  placeOrder() {
    this.disableButton = true;

    this._orders.updateOrder({
      id: this._cart.orderId,
      place: true
    }, [UpdateOrderParams.place])
      .subscribe(
        () => {
          this._snackBar.open('Your order has been successfully placed.', 'Close', { duration: 3000 });
          this._cart.clearCart();
          setTimeout(() => this._router.navigateByUrl('/'), 4000);
        },
        () => {
          this._snackBar.open('There was a problem placing your order.', 'Close', { duration: 8000 });
          this.disableButton = false;
        }
      );
  }
}
