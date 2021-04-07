import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandler {

  constructor() { }

  handleError(err: HttpErrorResponse): Observable<never> {
    let displayMessage = '';

    if (err.error instanceof ErrorEvent) {
      displayMessage = `Client-side error: ${err.error.message}`;
    } else {
      displayMessage = `Server-side error: ${err.message}`;
    }

    return throwError(displayMessage);
  }
}
