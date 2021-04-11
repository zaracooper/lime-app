import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

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
import { EmptyCartGuard } from 'src/app/core/guards/empty-cart.guard';

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
      {
        path: '', canActivate: [EmptyCartGuard], children: [
          { path: 'billing-address', component: BillingAddressComponent },
          { path: 'customer', component: CustomerComponent },
          { path: 'payment', component: PaymentComponent },
          { path: 'place-order', component: PlaceOrderComponent },
          { path: 'shipping-address', component: ShippingAddressComponent },
          { path: 'shipping-methods', component: ShippingMethodsComponent }
        ]
      }
    ]),
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    MatRadioModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CheckoutModule { }
