import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './pages/customer/customer.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TitleComponent } from './components/title/title.component';
import { AddressComponent } from './components/address/address.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { BillingAddressComponent } from './pages/billing-address/billing-address.component';
import { ShippingAddressComponent } from './pages/shipping-address/shipping-address.component';
import { ShippingMethodsComponent } from './pages/shipping-methods/shipping-methods.component';
import { MatRadioModule } from '@angular/material/radio';
import { PaymentComponent } from './pages/payment/payment.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';

@NgModule({
  declarations: [CustomerComponent, TitleComponent, AddressComponent, BillingAddressComponent, ShippingAddressComponent, ShippingMethodsComponent, PaymentComponent, PlaceOrderComponent],
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
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatRadioModule,
    CommonModule
  ]
})
export class CheckoutModule { }
