import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

import { SharedModule } from '../../shared/shared.module';

import { AddressComponent } from './components/address/address.component';
import { BillingAddressComponent } from './pages/billing-address/billing-address.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ShippingAddressComponent } from './pages/shipping-address/shipping-address.component';
import { ShippingMethodsComponent } from './pages/shipping-methods/shipping-methods.component';
import { EmptyCartGuard } from 'src/app/core/guards/empty-cart.guard';
import { AddressListComponent } from './components/address-list/address-list.component';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import { CancelPaymentComponent } from './pages/cancel-payment/cancel-payment.component';

@NgModule({
  declarations: [
    CustomerComponent,
    AddressComponent,
    BillingAddressComponent,
    ShippingAddressComponent,
    ShippingMethodsComponent,
    PaymentComponent,
    PlaceOrderComponent,
    AddressListComponent,
    CountrySelectComponent,
    CancelPaymentComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '', canActivate: [EmptyCartGuard], children: [
          { path: 'billing-address', component: BillingAddressComponent },
          { path: 'cancel-payment', component: CancelPaymentComponent },
          { path: 'customer', component: CustomerComponent },
          { path: 'payment', component: PaymentComponent },
          { path: 'place-order', component: PlaceOrderComponent },
          { path: 'shipping-address', component: ShippingAddressComponent },
          { path: 'shipping-methods', component: ShippingMethodsComponent }
        ]
      }
    ]),
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CheckoutModule { }
