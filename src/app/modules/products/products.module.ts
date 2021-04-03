import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductComponent } from './pages/product/product.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ProductListComponent, ProductComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: ProductListComponent },
      { path: 'product', component: ProductComponent }
    ]),
    CommonModule,
    MatGridListModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule
  ]
})
export class ProductsModule { }
