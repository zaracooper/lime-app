import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { UpdateOrderParams } from 'src/app/data/schema/order';
import { CartService } from 'src/app/data/services/cart.service';
import { CustomerService } from 'src/app/data/services/customer.service';
import { OrderService } from 'src/app/data/services/order.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private _orders: OrderService,
    private _customers: CustomerService,
    private _cart: CartService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this._customers.getCurrentCustomer()
      .subscribe(
        customer => this.email.setValue(customer.email)
      );
  }

  addCustomerEmail() {
    this._orders.updateOrder(
      { id: this._cart.orderId, customerEmail: this.email.value },
      UpdateOrderParams.customerEmail)
      .subscribe(
        () => this._router.navigateByUrl('/billing-address'),
        err => this._snackBar.open('There was a problem adding your email to the order.', 'Close', { duration: 8000 })
      );
  }
}
