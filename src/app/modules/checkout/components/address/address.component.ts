import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Address } from 'src/app/data/schema/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() buttonText: string = '';
  @Input() showTitle?: boolean = false;
  @Input() createAddress!: (address: Address) => void;

  countryCode: string = '';

  addressForm = this._fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    line1: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    stateCode: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  setCountryCode(code: string) {
    this.countryCode = code;
  }

  addAddress() {
    this.createAddress({
      firstName: this.addressForm.get('firstName')?.value,
      lastName: this.addressForm.get('lastName')?.value,
      line1: this.addressForm.get('line1')?.value,
      city: this.addressForm.get('city')?.value,
      zipCode: this.addressForm.get('zipCode')?.value,
      stateCode: this.addressForm.get('stateCode')?.value,
      countryCode: this.addressForm.get('countryCode')?.value,
      phone: this.addressForm.get('phone')?.value
    });
  }

}
