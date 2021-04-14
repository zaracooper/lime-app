import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { iif } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { GetOrderParams, Order, UpdateOrderParams } from 'src/app/data/schema/order';
import { CartService } from 'src/app/data/services/cart.service';
import { OrderService } from 'src/app/data/services/order.service';
import { PaypalPaymentService } from 'src/app/data/services/paypal-payment.service';
import { environment } from 'src/environments/environment';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  approvalUrl: string = '';

  constructor(
    private _orders: OrderService,
    private _cart: CartService,
    private _router: Router,
    private _payments: PaypalPaymentService
  ) { }

  ngOnInit() {
    const orderId = this._cart.orderId;

    this._orders.getOrder(orderId, GetOrderParams.paymentSource)
      .pipe(
        concatMap((order: Order) => {
          const paymentSourceId = order.paymentSource?.id;

          const paymentMethod = order.availablePaymentMethods?.filter(
            (method) => method.paymentSourceType == 'paypal_payments'
          )[0];

          return iif(
            () => paymentSourceId ? true : false,
            this._payments.getPaypalPayment(paymentSourceId || ''),
            this._orders.updateOrder({
              id: orderId,
              paymentMethodId: paymentMethod?.id
            }, [UpdateOrderParams.paymentMethod])
              .pipe(concatMap(
                order => this._payments.createPaypalPayment({
                  orderId: orderId,
                  cancelUrl: `${environment.clientUrl}/cancel-payment`,
                  returnUrl: `${environment.clientUrl}/place-order`
                })
              ))
          );
        }))
      .subscribe(
        paypalPayment => this.approvalUrl = paypalPayment?.approvalUrl || '',
        err => this._router.navigateByUrl('/error')
      );
  }

  navigateToPaypal() {
    window.location.href = this.approvalUrl;
  }
}
