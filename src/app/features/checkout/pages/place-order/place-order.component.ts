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
    private route: ActivatedRoute,
    private router: Router,
    private payments: PaypalPaymentService,
    private orders: OrderService,
    private cart: CartService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        concatMap(params => {
          const payerId = params['PayerID'];
          const orderId = this.cart.orderId;

          return iif(
            () => payerId.length > 0,
            this.orders.getOrder(orderId, GetOrderParams.paymentSource)
              .pipe(
                concatMap(order => {
                  const paymentSourceId = order.paymentSource?.id || '';

                  return iif(
                    () => paymentSourceId ? paymentSourceId.length > 0 : false,
                    this.payments.updatePaypalPayment(paymentSourceId, payerId)
                  );
                })
              )
          );
        }))
      .subscribe(
        () => this.disableButton = false,
        () => this.router.navigateByUrl('/error')
      );
  }

  placeOrder() {
    this.disableButton = true;

    this.orders.updateOrder({
      id: this.cart.orderId,
      place: true
    }, [UpdateOrderParams.place])
      .subscribe(
        () => {
          this.snackBar.open('Your order has been successfully placed.', 'Close', { duration: 3000 });
          this.cart.clearCart();
          setTimeout(() => this.router.navigateByUrl('/'), 4000);
        },
        () => {
          this.snackBar.open('There was a problem placing your order.', 'Close', { duration: 8000 });
          this.disableButton = false;
        }
      );
  }
}
