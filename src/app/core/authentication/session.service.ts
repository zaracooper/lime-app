import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private url: string = `${environment.apiUrl}/session`;

  constructor(private _http: HttpClient, private _eh: HttpErrorHandler) { }

  isCustomerLoggedIn(): Observable<object> {
    return this._http.get<object>(`${this.url}/customer`)
      .pipe(catchError(this._eh.handleError));
  }

  logout(): Observable<object> {
    return this._http.get<object>(`${this.url}/destroy`)
      .pipe(catchError(this._eh.handleError));
  }
}
