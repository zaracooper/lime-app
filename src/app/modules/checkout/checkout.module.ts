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

@NgModule({
  declarations: [CustomerComponent, TitleComponent, AddressComponent],
  imports: [
    RouterModule.forChild([
      { path: 'customer', component: CustomerComponent },
      { path: 'address', component: AddressComponent }
    ]),
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule
  ]
})
export class CheckoutModule { }
