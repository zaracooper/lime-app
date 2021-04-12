import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-same-address',
  templateUrl: './same-address.component.html',
  styleUrls: ['./same-address.component.css']
})
export class SameAddressComponent {
  @Input() text: string = '';
  @Output() isCheckboxChecked = new EventEmitter<boolean>();

  constructor() { }

  setValue(change: MatCheckboxChange) {
    this.isCheckboxChecked.emit(change.checked);
  }
}
