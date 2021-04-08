import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  deleteItem(key: string) {
    localStorage.removeItem(key);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
