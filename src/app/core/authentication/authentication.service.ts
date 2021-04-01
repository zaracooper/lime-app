import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<object> {
    return this.http.post(
      '/oauth/token',
      { email: email, password: password },
      { headers: { 'Content-Type': 'application/json' } })
      .pipe(catchError(this.handleError));
  }

  logout(): Observable<object> {
    return this.http.get('oauth/destroy')
      .pipe(catchError(this.handleError));
  }

  session(): Observable<object> {
    return this.http.get('oauth/session')
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errMsg = '';

    if (err.error instanceof ErrorEvent) {
      errMsg = `A client-side error occurred: ${err.error.message}`;
    } else {
      errMsg = `A server-side error occurred. Code: ${err.status}. Message: ${err.message}`;
    }

    return throwError(errMsg);
  }
}
