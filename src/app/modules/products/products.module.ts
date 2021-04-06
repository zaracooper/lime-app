import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ProductComponent } from './pages/product/product.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProductListComponent, ProductComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductListComponent },
      { path: 'product', component: ProductComponent }
    ]),
    MatGridListModule,
    MatPaginatorModule,
    MatCardModule,
    LayoutModule,
    SharedModule
  ]
})
export class ProductsModule { }
