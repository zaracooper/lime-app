import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from '../../shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { LineItem } from '../schema/line-item';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {
  private eh: HttpErrorHandler = new HttpErrorHandler();
  private url: string = `${environment.apiUrl}/api/line-items`;

  constructor(private http: HttpClient) { }

  createLineItem(lineItem: LineItem): Observable<LineItem> {
    return this.http.post<LineItem>(this.url, lineItem)
      .pipe(catchError(this.eh.handleError));
  }

  getLineItem(id: string): Observable<LineItem> {
    return this.http.get<LineItem>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  updateLineItem(id: string, quantity: number): Observable<LineItem> {
    return this.http.patch<LineItem>(`${this.url}/${id}`, { quantity: quantity })
      .pipe(catchError(this.eh.handleError));
  }

  deleteLineItem(id: string): Observable<LineItem> {
    return this.http.delete<LineItem>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }
}
