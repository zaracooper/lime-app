import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, mergeMap } from 'rxjs/operators';
import { HeaderService } from 'src/app/core/header/header.service';
import { Sku } from 'src/app/data/schema/sku';
import { SkuService } from 'src/app/data/services/sku.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  id: string | null = '';
  product!: Sku;

  constructor(
    private _route: ActivatedRoute,
    private _skus: SkuService,
    private _router: Router,
    private _header: HeaderService
  ) { }

  ngOnInit() {
    this._route.paramMap
      .pipe(
        mergeMap(params => {
          this.id = params.get('id');
          return this._skus.getSku(this.id || '');
        }),
        map((sku) => {
          this.product = sku;
        })
      ).subscribe(
        {
          error: (err) => this._router.navigateByUrl('/error')
        }
      );

    this._header.setHeaderButtonsVisibility(true);
  }

}
