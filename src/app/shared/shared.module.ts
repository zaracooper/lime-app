import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ItemQuantityComponent } from './components/item-quantity/item-quantity.component';
import { TitleComponent } from './components/title/title.component';
import { SimplePageComponent } from './components/simple-page/simple-page.component';

import { WordWrapPipe } from './pipes/word-wrap.pipe';


@NgModule({
  declarations: [SimplePageComponent, TitleComponent, WordWrapPipe, ItemQuantityComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatMenuModule, RouterModule],
  exports: [
    CommonModule,
    ItemQuantityComponent,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    SimplePageComponent,
    TitleComponent,
    WordWrapPipe
  ]
})
export class SharedModule { }
