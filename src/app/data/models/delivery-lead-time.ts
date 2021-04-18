import { ShippingMethod } from "./shipping-method";
import { StockLocation } from "./stock-location";

export interface DeliveryLeadTime {
    id?: string;
    minHours?: number;
    maxHours?: number;
    minDays?: number;
    maxDays?: number;
    shippingMethod?: ShippingMethod;
    stockLocation?: StockLocation;
}
