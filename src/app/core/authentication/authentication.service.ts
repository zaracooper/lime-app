import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpErrorHandlerService } from '../services/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private eh: HttpErrorHandlerService) { }

  getClientSession(): Observable<object> {
    return this.http.post<object>(
      `${environment.apiUrl}/oauth/token`,
      { grantType: 'client_credentials' },
      { headers: { 'Content-Type': 'application/json' } })
      .pipe(catchError(this.eh.handleError));
  }

  login(email: string, password: string): Observable<object> {
    return this.http.post<object>(
      `${environment.apiUrl}/oauth/token`,
      { email: email, password: password, grantType: 'password' },
      { headers: { 'Content-Type': 'application/json' } })
      .pipe(catchError(this.eh.handleError));
  }

  logout(): Observable<object> {
    return this.http.get<object>(`${environment.apiUrl}/session/destroy`)
      .pipe(catchError(this.eh.handleError));
  }
}
