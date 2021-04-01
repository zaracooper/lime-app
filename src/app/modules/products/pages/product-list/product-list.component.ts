import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SkuService } from 'src/app/data/services/sku.service';
import { Sku } from 'src/app/data/schema/sku';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  cols = 4;
  products: Sku[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private skuService: SkuService
  ) {
    breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet,
      Breakpoints.Web
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints['(max-width: 599.98px) and (orientation: portrait)']) {
          this.cols = 1;
        }
        else if (result.breakpoints['(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)']) {
          this.cols = 2;
        }
        else if (result.breakpoints['(min-width: 840px) and (orientation: portrait)']) {
          this.cols = 4;
        }
      }
    });
  }

  ngOnInit(): void {
    this.skuService.getSkus(1, 20)
      .subscribe(
        skus => { this.products = skus; },
        err => { console.log(err); }
      );
  }

}
