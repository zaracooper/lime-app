import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorComponent } from './components/error/error.component';

import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [HeaderComponent, NotFoundComponent, ErrorComponent],
  imports: [
    RouterModule.forChild([
      { path: '404', component: NotFoundComponent },
      { path: 'error', component: ErrorComponent },
      { path: '**', redirectTo: '/404' }
    ]),
    MatBadgeModule,
    SharedModule
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
