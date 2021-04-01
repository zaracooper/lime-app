import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const mods = [
  CommonModule,
];

@NgModule({
  declarations: [],
  imports: mods,
  exports: mods
})
export class SharedModule { }
