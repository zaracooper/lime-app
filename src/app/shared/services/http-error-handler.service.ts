import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Logger } from './logger.service';

export class HttpErrorHandler {
  private logger = new Logger();

  constructor(level?: string) {
    this.logger = new Logger(level);
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    let displayMessage = '';

    this.logger.warn(err);

    if (err.error instanceof ErrorEvent) {
      displayMessage = `Client-side error: ${err.error.message}`;
    } else {
      displayMessage = `Server-side error: ${err.message}`;
    }

    return throwError(displayMessage);
  }
}
