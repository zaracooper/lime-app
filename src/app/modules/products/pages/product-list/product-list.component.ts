import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  rows = 4;

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints['(max-width: 599.98px) and (orientation: portrait)']) {
          this.rows = 1;
        }
        else if (result.breakpoints['(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)']) {
          this.rows = 2;
        }
        else if (result.breakpoints['(min-width: 840px) and (orientation: portrait)']) {
          this.rows = 4;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
