import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './pages/customer/customer.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TitleComponent } from './components/title/title.component';


@NgModule({
  declarations: [CustomerComponent, TitleComponent],
  imports: [
    RouterModule.forChild([
      { path: 'customer', component: CustomerComponent }
    ]),
    MatInputModule,
    MatIconModule,
    CommonModule
  ]
})
export class CheckoutModule { }
