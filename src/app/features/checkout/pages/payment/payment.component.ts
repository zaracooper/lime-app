import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { iif } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { GetOrderParams, Order, UpdateOrderParams } from 'src/app/data/models/order';
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
    private orders: OrderService,
    private cart: CartService,
    private router: Router,
    private payments: PaypalPaymentService
  ) { }

  ngOnInit() {
    const orderId = this.cart.orderId;

    this.orders.getOrder(orderId, GetOrderParams.paymentSource)
      .pipe(
        concatMap((order: Order) => {
          const paymentSourceId = order.paymentSource?.id;

          const paymentMethod = order.availablePaymentMethods?.filter(
            (method) => method.paymentSourceType == 'paypalpayments'
          )[0];

          return iif(
            () => paymentSourceId ? true : false,
            this.payments.getPaypalPayment(paymentSourceId || ''),
            this.orders.updateOrder({
              id: orderId,
              paymentMethodId: paymentMethod?.id
            }, [UpdateOrderParams.paymentMethod])
              .pipe(concatMap(
                order => this.payments.createPaypalPayment({
                  orderId: orderId,
                  cancelUrl: `${environment.clientUrl}/cancel-payment`,
                  returnUrl: `${environment.clientUrl}/place-order`
                })
              ))
          );
        }))
      .subscribe(
        paypalPayment => this.approvalUrl = paypalPayment?.approvalUrl || '',
        err => this.router.navigateByUrl('/error')
      );
  }

  navigateToPaypal() {
    window.location.href = this.approvalUrl;
  }
}
