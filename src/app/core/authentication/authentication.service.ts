import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpErrorHandler } from '../../shared/services/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = `${environment.apiUrl}/oauth`;

  constructor(private _http: HttpClient, private _eh: HttpErrorHandler) { }

  getClientSession(): Observable<object> {
    return this._http.post<object>(
      `${this.url}/token`,
      { grantType: 'client_credentials' },
      { headers: { 'Content-Type': 'application/json' } })
      .pipe(catchError(this._eh.handleError));
  }

  login(email: string, password: string): Observable<object> {
    return this._http.post<object>(
      `${this.url}/token`,
      { username: email, password: password, grantType: 'password' },
      { headers: { 'Content-Type': 'application/json' } })
      .pipe(catchError(this._eh.handleError));
  }
}
