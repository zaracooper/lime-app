import { NgModule } from '@angular/core';
import { SummaryComponent } from './pages/summary/summary.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CodesComponent } from './pages/codes/codes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SummaryComponent, CodesComponent],
  imports: [
    RouterModule.forChild([
      { path: 'cart', component: SummaryComponent },
      { path: 'codes', component: CodesComponent }
    ]),
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule
  ]
})
export class CartModule { }
