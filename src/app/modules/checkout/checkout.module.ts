import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';

import { SharedModule } from './../../shared/shared.module';

import { AddressComponent } from './components/address/address.component';
import { BillingAddressComponent } from './pages/billing-address/billing-address.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ShippingAddressComponent } from './pages/shipping-address/shipping-address.component';
import { ShippingMethodsComponent } from './pages/shipping-methods/shipping-methods.component';

@NgModule({
  declarations: [
    CustomerComponent,
    AddressComponent,
    BillingAddressComponent,
    ShippingAddressComponent,
    ShippingMethodsComponent,
    PaymentComponent,
    PlaceOrderComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'customer', component: CustomerComponent },
      { path: 'billing-address', component: BillingAddressComponent },
      { path: 'shipping-address', component: ShippingAddressComponent },
      { path: 'shipping-methods', component: ShippingMethodsComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'place-order', component: PlaceOrderComponent }
    ]),
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    SharedModule
  ]
})
export class CheckoutModule { }
