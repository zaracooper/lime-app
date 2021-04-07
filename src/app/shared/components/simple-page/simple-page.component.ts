import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.css']
})
export class SimplePageComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() number?: string;
  @Input() icon?: string;
  @Input() buttonText: string = '';
  @Input() buttonLink?: string = '/';
  @Input() centerText?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
