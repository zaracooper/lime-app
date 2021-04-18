import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { Shipment } from '../models/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  private url: string = `${environment.apiUrl}/api/shipments`;

  constructor(private http: HttpClient, private eh: HttpErrorHandler) { }

  getShipment(id: string): Observable<Shipment> {
    return this.http.get<Shipment>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateShipment(id: string, shippingMethodId: string): Observable<Shipment> {
    return this.http.patch<Shipment>(
      `${this.url}/${id}`,
      { shippingMethodId: shippingMethodId }
    )
      .pipe(catchError(this.eh.handleError));
  }
}
