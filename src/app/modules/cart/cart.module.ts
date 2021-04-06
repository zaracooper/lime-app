import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';

import { SharedModule } from 'src/app/shared/shared.module';

import { CodesComponent } from './pages/codes/codes.component';
import { SummaryComponent } from './pages/summary/summary.component';


@NgModule({
  declarations: [SummaryComponent, CodesComponent],
  imports: [
    RouterModule.forChild([
      { path: 'cart', component: SummaryComponent },
      { path: 'codes', component: CodesComponent }
    ]),
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class CartModule { }
