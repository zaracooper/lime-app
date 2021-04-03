import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/core/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { CustomerAddress } from '../schema/customer-address';

@Injectable({
  providedIn: 'root'
})
export class CustomerAddressService {
  private eh: HttpErrorHandler = new HttpErrorHandler();
  private url: string = `${environment.apiUrl}/api/customer-addresses`;

  constructor(private http: HttpClient) { }

  createCustomerAddress(addressId: string, customerId: string): Observable<CustomerAddress> {
    return this.http.post<CustomerAddress>(this.url, {
      addressId: addressId, customerId: customerId
    })
      .pipe(catchError(this.eh.handleError));
  }

  getCustomerAddress(id: string): Observable<CustomerAddress> {
    return this.http.get<CustomerAddress>(this.url)
      .pipe(catchError(this.eh.handleError));
  }
}
