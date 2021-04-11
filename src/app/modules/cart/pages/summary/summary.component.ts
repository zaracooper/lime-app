import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';
import { mergeMap } from 'rxjs/operators';
import { GetOrderParams, Order } from 'src/app/data/schema/order';
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
    private _orders: OrderService,
    private _lineItems: LineItemService,
    private _cart: CartService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._orders.getOrder(this._cart.orderId, GetOrderParams.cart)
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
    this._snackBar.open(`There was a problem ${msg}.`, 'Close', { duration: 8000 })
  }

  deleteLineItem(id: string) {
    this._lineItems.deleteLineItem(id)
      .pipe(
        mergeMap(() => this._orders.getOrder(this._cart.orderId, GetOrderParams.cart))
      ).subscribe(
        order => {
          this.processOrder(order);
          this._cart.itemCount = order.skusCount || this._cart.itemCount;
          this._snackBar.open(`Item successfully removed from cart.`, 'Close', { duration: 8000 })
        },
        err => this.showOrderError('deleting your order')
      );
  }
}
