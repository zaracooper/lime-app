import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { combineLatest } from 'rxjs';
import { DeliveryLeadTime } from 'src/app/data/schema/delivery-lead-time';
import { LineItem } from 'src/app/data/schema/line-item';
import { GetOrderParams } from 'src/app/data/schema/order';
import { Shipment } from 'src/app/data/schema/shipment';
import { ShippingMethod } from 'src/app/data/schema/shipping-method';
import { CartService } from 'src/app/data/services/cart.service';
import { DeliveryLeadTimeService } from 'src/app/data/services/delivery-lead-time.service';
import { OrderService } from 'src/app/data/services/order.service';
import { ShipmentService } from 'src/app/data/services/shipment.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-shipping-methods',
  templateUrl: './shipping-methods.component.html',
  styleUrls: ['./shipping-methods.component.css']
})
export class ShippingMethodsComponent implements OnInit {
  shipments: Shipment[] | undefined = [];
  shipmentsForm: FormGroup = this._fb.group({});

  constructor(
    private _orders: OrderService,
    private _dlts: DeliveryLeadTimeService,
    private _cart: CartService,
    private _router: Router,
    private _fb: FormBuilder,
    private _shipments: ShipmentService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    combineLatest([
      this._orders.getOrder(this._cart.orderId, GetOrderParams.shipments),
      this._dlts.getDeliveryLeadTimes()
    ]).subscribe(
      values => {
        const lineItems = values[0].lineItems || [];
        const deliveryLeadTimes = values[1] || [];
        let li: LineItem;
        let lt: DeliveryLeadTime[];

        this.shipments = values[0].shipments?.map((shipment) => {
          if (shipment.id) {
            this.shipmentsForm.addControl(shipment.id, new FormControl('', Validators.required));
          }

          if (shipment.lineItems) {
            shipment.lineItems = shipment.lineItems.map(item => {
              li = this.findItem(lineItems, item.skuCode || '');
              item.imageUrl = li.imageUrl;
              item.name = li.name;
              return item;
            });
          }

          if (shipment.availableShippingMethods) {
            lt = this.findLocationLeadTime(deliveryLeadTimes, shipment);
            shipment.availableShippingMethods = shipment.availableShippingMethods?.map(
              method => {
                method.deliveryLeadTime = this.findMethodLeadTime(lt, method);
                return method;
              });
          }

          return shipment;
        });
      },
      err => this._router.navigateByUrl('/error')
    );
  }

  setShipmentMethods() {
    const shipmentsFormValue = this.shipmentsForm.value;

    combineLatest(Object.keys(shipmentsFormValue).map(
      key => this._shipments.updateShipment(key, shipmentsFormValue[key])
    )).subscribe(
      () => {
        this._snackBar.open('Your shipments have been updated with a shipping method.', 'Close', { duration: 3000 });
        setTimeout(() => this._router.navigateByUrl('/payment'), 4000);
      },
      err => this._snackBar.open('There was a problem adding shipping methods to your sipments.', 'Close', { duration: 5000 })
    );
  }


  private findItem(lineItems: LineItem[], skuCode: string): LineItem {
    return lineItems.filter((item) => item.skuCode == skuCode)[0];
  }

  private findLocationLeadTime(times: DeliveryLeadTime[], shipment: Shipment): DeliveryLeadTime[] {
    return times.filter((dlTime) => dlTime?.stockLocation?.id == shipment?.stockLocation?.id);
  }

  private findMethodLeadTime(times: DeliveryLeadTime[], method: ShippingMethod): DeliveryLeadTime {
    return times.filter((dlTime) => dlTime?.shippingMethod?.id == method?.id)[0];
  }
}
