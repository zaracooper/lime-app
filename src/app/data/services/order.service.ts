import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { Order, GetOrderParams, UpdateOrderParams } from '../schema/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url: string = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient, private eh: HttpErrorHandler) { }

  createOrder(): Observable<Order> {
    return this.http.post<Order>(this.url, {})
      .pipe(catchError(this.eh.handleError));
  }

  getOrder(id: string, orderParam: GetOrderParams): Observable<Order> {
    let params = new HttpParams();
    if (orderParam != GetOrderParams.none) {
      params.append(orderParam, 'true');
    }

    return this.http.get<Order>(`${this.url}/${id}`, { params: params })
      .pipe(catchError(this.eh.handleError));
  }

  updateOrder(order: Order, param: UpdateOrderParams): Observable<Order> {
    return this.http.patch<Order>(
      `${this.url}/${order.id}`,
      order,
      { params: { 'field': param.toString() } }
    )
      .pipe(catchError(this.eh.handleError));
  }

  getOrderShipments(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${id}/shipments`)
      .pipe(catchError(this.eh.handleError));
  }
}
