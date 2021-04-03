import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/core/services/http-error-handler.service';
import { environment } from 'src/environments/environment';
import { Sku } from 'src/app/data/schema/sku';

@Injectable({
  providedIn: 'root'
})
export class SkuService {
  private eh: HttpErrorHandler = new HttpErrorHandler();

  constructor(private http: HttpClient) { }

  getSkus(page: number, pageSize: number): Observable<Sku[]> {
    let params = new HttpParams();
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());

    return this.http.get<Sku[]>(
      `${environment.apiUrl}/api/skus`,
      { params: params })
      .pipe(catchError(this.eh.handleError));
  }
}
