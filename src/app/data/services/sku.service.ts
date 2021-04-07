import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from '../../shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { Sku } from 'src/app/data/schema/sku';

@Injectable({
  providedIn: 'root'
})
export class SkuService {
  private eh: HttpErrorHandler = new HttpErrorHandler();
  private url: string = `${environment.apiUrl}/api/skus`;

  constructor(private http: HttpClient) { }

  getSku(id: string): Observable<Sku> {
    return this.http.get<Sku>(`${this.url}/${id}`)
      .pipe(catchError(this.eh.handleError));
  }

  getSkus(page: number, pageSize: number): Observable<Sku[]> {
    return this.http.get<Sku[]>(
      this.url,
      {
        params: {
          'page': page.toString(),
          'pageSize': pageSize.toString()
        }
      })
      .pipe(catchError(this.eh.handleError));
  }
}
