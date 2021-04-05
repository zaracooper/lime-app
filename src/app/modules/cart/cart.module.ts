import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './pages/summary/summary.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [SummaryComponent],
  imports: [
    RouterModule.forChild([
      { path: 'cart', component: SummaryComponent }
    ]),
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    CommonModule
  ]
})
export class CartModule { }
