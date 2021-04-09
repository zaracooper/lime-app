import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _storage: LocalStorageService) { }

  get orderId(): string {
    const id = this._storage.getItem('order-id');
    return id ? id : '';
  }

  set orderId(id: string) {
    this._storage.addItem('order-id', id);
  }

  get itemCount(): number {
    const itemCount = this._storage.getItem('item-count');

    return itemCount ? parseInt(itemCount) : 0;
  }

  set itemCount(amount: number) {
    this._storage.addItem('item-count', amount.toString());
  }

  incrementItemCount(amount: number) {
    this.itemCount = this.itemCount + amount;
  }

  decrementItemCount(amount: number) {
    this.itemCount = this.itemCount - amount;
  }
}
