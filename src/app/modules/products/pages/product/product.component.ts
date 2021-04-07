import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { map, mergeMap } from 'rxjs/operators';
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
    private route: ActivatedRoute,
    private skuService: SkuService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        mergeMap(params => {
          this.id = params.get('id');
          return this.skuService.getSku(this.id || '');
        }),
        map((sku) => {
          this.product = sku;
        })
      ).subscribe(
        {
          error: (err) => this.router.navigateByUrl('/error')
        }
      );
  }

}
