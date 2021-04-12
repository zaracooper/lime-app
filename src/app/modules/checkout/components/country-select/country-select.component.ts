import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Country } from 'src/app/data/schema/country';
import { CountryService } from 'src/app/data/services/country.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css']
})
export class CountrySelectComponent implements OnInit {
  country: string = 'Country';
  countries: Country[] = [];
  @Output() setCountryEvent = new EventEmitter<string>();

  constructor(private _countries: CountryService) { }

  ngOnInit() {
    this._countries.getCountries()
      .subscribe(
        countries => {
          this.countries = countries;
        }
      );
  }

  setCountry(value: Country) {
    this.country = value.name || '';
    this.setCountryEvent.emit(value.code);
  }
}
