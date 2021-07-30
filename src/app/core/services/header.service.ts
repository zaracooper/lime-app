import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private headerButtonsVisibility = new BehaviorSubject(true);

  showHeaderButtons$ = this.headerButtonsVisibility.asObservable();

  constructor() { }

  setHeaderButtonsVisibility(visible: boolean) {
    this.headerButtonsVisibility.next(visible);
  }
}