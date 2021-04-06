import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [HeaderComponent, NotFoundComponent],
  imports: [
    RouterModule.forChild([
      { path: '404', component: NotFoundComponent }
    ]),
    SharedModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
