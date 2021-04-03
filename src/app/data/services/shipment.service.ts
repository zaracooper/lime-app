import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/core/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { Shipment } from '../schema/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private eh: HttpErrorHandler = new HttpErrorHandler();
  private url: string = `${environment.apiUrl}/api/shipments`;

  constructor(private http: HttpClient) { }

  getShipment(id: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateShipment(id: string, shippingMethod: string): Observable<Shipment> {
    return this.http.patch<Shipment>(
      `${this.url}/${id}`,
      { shippingMethod: shippingMethod }
    )
      .pipe(catchError(this.eh.handleError));
  }
}
