import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { mergeMap } from 'rxjs/operators';
import { GetOrderParams, Order } from 'src/app/data/models/order';
import { CartService } from 'src/app/data/services/cart.service';
import { LineItemService } from 'src/app/data/services/line-item.service';
import { OrderService } from 'src/app/data/services/order.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  order: Order = {};

  summary: { name: string, amount: string | undefined, id: string }[] = [];

  constructor(
    private orders: OrderService,
    private lineItems: LineItemService,
    private cart: CartService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.orders.getOrder(this.cart.orderId, GetOrderParams.cart)
      .subscribe(
        order => this.processOrder(order),
        err => this.showOrderError('retrieving your cart')
      );
  }

  private processOrder(order: Order) {
    this.order = order;

    this.summary = [
      { name: 'Subtotal', amount: order.formattedSubtotalAmount, id: 'subtotal' },
      { name: 'Discount', amount: order.formattedDiscountAmount, id: 'discount' },
      { name: 'Taxes (included)', amount: order.formattedTotalTaxAmount, id: 'taxes' },
      { name: 'Shipping', amount: order.formattedShippingAmount, id: 'shipping' },
      { name: 'Gift Card', amount: order.formattedGiftCardAmount, id: 'gift-card' }
    ];
  }

  private showOrderError(msg: string) {
    this.snackBar.open(`There was a problem ${msg}.`, 'Close', { duration: 8000 });
  }

  checkout() {
    this.router.navigateByUrl('/customer');
  }

  deleteLineItem(id: string) {
    this.lineItems.deleteLineItem(id)
      .pipe(
        mergeMap(() => this.orders.getOrder(this.cart.orderId, GetOrderParams.cart))
      ).subscribe(
        order => {
          this.processOrder(order);
          this.cart.itemCount = order.skusCount || this.cart.itemCount;
          this.snackBar.open(`Item successfully removed from cart.`, 'Close', { duration: 8000 })
        },
        err => this.showOrderError('deleting your order')
      );
  }
}
