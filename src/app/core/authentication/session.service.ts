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

  isCustomerLoggedIn(): Observable<object> {
    return this._http.get<object>(`${this.url}/customer`)
      .pipe(catchError(this._eh.handleError));
  }

  logout(): Observable<object> {
    return this._http.get<object>(`${this.url}/destroy`)
      .pipe(catchError(this._eh.handleError));
  }
}
