import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, mergeMap } from 'rxjs/operators';
import { HeaderService } from 'src/app/core/header/header.service';
import { Order } from 'src/app/data/schema/order';
import { Sku } from 'src/app/data/schema/sku';
import { CartService } from 'src/app/data/services/cart.service';
import { LineItemService } from 'src/app/data/services/line-item.service';
import { OrderService } from 'src/app/data/services/order.service';
import { SkuService } from 'src/app/data/services/sku.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: string | null = '';
  product!: Sku;
  quantity: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private _skus: SkuService,
    private _router: Router,
    private _header: HeaderService,
    private _orders: OrderService,
    private _lineItems: LineItemService,
    private _cart: CartService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._route.paramMap
      .pipe(
        mergeMap(params => {
          this.id = params.get('id');
          return this._skus.getSku(this.id || '');
        }),
        map((sku) => {
          this.product = sku;
        })
      ).subscribe({
        error: (err) => this._router.navigateByUrl('/error')
      });

    this._header.setHeaderButtonsVisibility(true);
  }

  addItemToCart() {
    if (this._cart.orderId == '') {
      this._orders.createOrder()
        .pipe(
          mergeMap((order: Order) => {
            this._cart.orderId = order.id;

            return this._lineItems.createLineItem({
              orderId: order.id,
              name: this.product.name,
              imageUrl: this.product.imageUrl,
              quantity: this.quantity,
              skuCode: this.product.code
            });
          })
        )
        .subscribe({
          error: err => this.showErrorSnackBar()
        });
    } else {
      this._lineItems.createLineItem({
        orderId: this._cart.orderId,
        name: this.product.name,
        imageUrl: this.product.imageUrl,
        quantity: this.quantity,
        skuCode: this.product.code
      }).subscribe({
        error: err => this.showErrorSnackBar()
      });
    }
  }

  setQuantity(no: number) {
    this.quantity = no;
  }

  private showErrorSnackBar() {
    this._snackBar.open('Failed to add your item to the cart.', 'Close', { duration: 8000 });
  }
}
