import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const mods = [
  CommonModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: mods,
  exports: mods
})
export class SharedModule { }
