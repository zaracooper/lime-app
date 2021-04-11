import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-quantity',
  templateUrl: './item-quantity.component.html',
  styleUrls: ['./item-quantity.component.css']
})
export class ItemQuantityComponent implements OnInit {
  @Input() quantity: number = 0;
  @Input() maxValue?: number = 0;
  @Input() disabled?: boolean = false;
  @Output() setQuantityEvent = new EventEmitter<number>();

  values: number[] = [];

  constructor() { }

  ngOnInit() {
    if (this.maxValue) {
      for (let i = 1; i <= this.maxValue; i++) {
        this.values.push(i);
      }
    }
  }

  setQuantity(value: number) {
    this.setQuantityEvent.emit(value);
  }
}
