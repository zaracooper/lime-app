import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from '../../shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { DeliveryLeadTime } from '../schema/delivery-lead-time';

@Injectable({
  providedIn: 'root'
})
export class DeliveryLeadTimeService {
  private eh: HttpErrorHandler = new HttpErrorHandler();
  private url: string = `${environment.apiUrl}/api/delivery-lead-times`;

  constructor(private http: HttpClient) { }

  getDeliveryLeadTimes(): Observable<DeliveryLeadTime[]> {
    return this.http.get<DeliveryLeadTime[]>(this.url)
      .pipe(catchError(this.eh.handleError));
  }
}
