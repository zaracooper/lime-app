import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from 'src/app/core/services/http-error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeliveryLeadTimeService {
  private eh: HttpErrorHandler = new HttpErrorHandler();

  constructor(private http: HttpClient) { }
}
