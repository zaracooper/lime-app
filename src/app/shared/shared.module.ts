import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimplePageComponent } from './components/simple-page/simple-page.component';
import { TitleComponent } from './components/title/title.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SimplePageComponent, TitleComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [
    CommonModule,
    SimplePageComponent,
    TitleComponent
  ]
})
export class SharedModule { }
