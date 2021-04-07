import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class HttpErrorHandler {

  constructor() { }

  handleError(err: HttpErrorResponse): Observable<never> {
    let error = { ...err, displayMessage: '', is404: false };

    if (err.error instanceof ErrorEvent) {
      error.displayMessage = `A client - side error occurred: ${err.error.message}`;
    } else {
      error.displayMessage = `A server - side error occurred.Code: ${err.status}.Message: ${err.message}`;
      error.is404 = err.status == 404;
    }

    return throwError(error);
  }
}
