import { Component, OnInit } from '@angular/core';

interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  items = [
    {
      name: 'Shirt XL Black',
      price: 35.50
    },
    {
      name: 'Shirt S White',
      price: 35.50
    },
    {
      name: 'Shirt L Grey',
      price: 35.50
    }
  ];
  summary = [
    {
      name: 'Subtotal',
      amount: 106.50,
      id: 'subtotal'
    },
    {
      name: 'Discount',
      amount: 0,
      id: 'discount'
    },
    {
      name: 'Taxes',
      amount: 20,
      id: 'taxes'
    },
    {
      name: 'Shipping',
      amount: 20,
      id: 'shipping'
    },
    {
      name: 'Gift Card',
      amount: 0,
      id: 'gift-card'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
