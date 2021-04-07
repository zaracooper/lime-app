import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SimplePageComponent } from './components/simple-page/simple-page.component';
import { TitleComponent } from './components/title/title.component';

import { WordWrapPipe } from './pipes/word-wrap.pipe';


@NgModule({
  declarations: [SimplePageComponent, TitleComponent, WordWrapPipe],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, RouterModule],
  exports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    SimplePageComponent,
    TitleComponent,
    WordWrapPipe,
    MatTooltipModule
  ]
})
export class SharedModule { }
