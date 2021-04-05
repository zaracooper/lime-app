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
import { BillingAddressComponent } from './pages/billing-address/billing-address.component';
import { ShippingAddressComponent } from './pages/shipping-address/shipping-address.component';

@NgModule({
  declarations: [CustomerComponent, TitleComponent, AddressComponent, BillingAddressComponent, ShippingAddressComponent],
  imports: [
    RouterModule.forChild([
      { path: 'customer', component: CustomerComponent },
      { path: 'billing-address', component: BillingAddressComponent },
      { path: 'shipping-address', component: ShippingAddressComponent }
    ]),
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule
  ]
})
export class CheckoutModule { }
