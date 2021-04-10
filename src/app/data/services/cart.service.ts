import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    this.cart.next({ orderId: id, itemCount: this.itemCount });
  }

  get itemCount(): number {
    const itemCount = this._storage.getItem('item-count');

    return itemCount ? parseInt(itemCount) : 0;
  }

  set itemCount(amount: number) {
    this._storage.addItem('item-count', amount.toString());
    this.cart.next({ orderId: this.orderId, itemCount: amount });
  }

  private cart = new BehaviorSubject({
    orderId: this.orderId,
    itemCount: this.itemCount
  });

  cartValue = this.cart.asObservable();

  incrementItemCount(amount: number) {
    this.itemCount = this.itemCount + amount;
  }

  decrementItemCount(amount: number) {
    this.itemCount = this.itemCount - amount;
  }

  clearCart() {
    this._storage.deleteItem('item-count');
    this.cart.next({ orderId: this.orderId, itemCount: 0 });
  }
}
