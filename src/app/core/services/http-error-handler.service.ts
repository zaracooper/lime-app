import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class HttpErrorHandler {

  constructor() { }

  handleError(err: HttpErrorResponse): Observable<never> {
    let errMsg = '';

    if (err.error instanceof ErrorEvent) {
      errMsg = `A client - side error occurred: ${err.error.message}`;
    } else {
      errMsg = `A server - side error occurred.Code: ${err.status}.Message: ${err.message}`;
    }

    return throwError(errMsg);
  }
}
