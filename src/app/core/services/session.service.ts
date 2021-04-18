import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/shared/services/http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private url: string = `${environment.apiUrl}/session`;
  private isLoggedIn = new BehaviorSubject(false);

  loggedInStatus = this.isLoggedIn.asObservable();

  constructor(private _http: HttpClient, private _eh: HttpErrorHandler) { }

  setLoggedInStatus(status: boolean) {
    this.isLoggedIn.next(status);
  }

  isCustomerLoggedIn(): Observable<{ message: string }> {
    return this._http.get<{ message: string }>(`${this.url}/customer/status`)
      .pipe(catchError(this._eh.handleError));
  }

  logout(): Observable<{ message: string }> {
    return this._http.get<{ message: string }>(`${this.url}/destroy`)
      .pipe(catchError(this._eh.handleError));
  }
}
