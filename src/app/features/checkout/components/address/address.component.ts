import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Address } from 'src/app/data/models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  @Input() buttonText: string = '';
  @Input() showTitle?: boolean = false;

  @Output() createAddress = new EventEmitter<Address>();

  @Input() checkboxText: string = '';
  @Output() isCheckboxChecked = new EventEmitter<boolean>();

  countryCode: string = '';

  addressForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    line1: [''],
    city: [''],
    zipCode: [''],
    stateCode: [''],
    phone: ['']
  });

  @ViewChild(FormGroupDirective) afDirective: FormGroupDirective | undefined;

  constructor(private fb: FormBuilder) { }

  setCountryCode(code: string) {
    this.countryCode = code;
  }

  addAddress() {
    this.createAddress.emit({
      firstName: this.addressForm.get('firstName')?.value,
      lastName: this.addressForm.get('lastName')?.value,
      line1: this.addressForm.get('line1')?.value,
      city: this.addressForm.get('city')?.value,
      zipCode: this.addressForm.get('zipCode')?.value,
      stateCode: this.addressForm.get('stateCode')?.value || 'N/A',
      countryCode: this.countryCode,
      phone: this.addressForm.get('phone')?.value
    });
  }

  setCheckboxValue(change: MatCheckboxChange) {
    if (this.isCheckboxChecked) {
      this.isCheckboxChecked.emit(change.checked);
    }
  }
}
