import { LineItem } from "./line-item";
import { ShippingMethod } from "./shipping-method";
import { StockLocation } from "./stock-location";

export interface Shipment {
    id?: string;
    number?: string;
    status?: string;
    currencyCode?: string;
    costAmountCents?: number;
    costAmountFloat?: number;
    formattedCostAmount?: string;
    skusCount?: number;
    stockLocation?: StockLocation;
    orderId?: string;
    availableShippingMethods?: ShippingMethod[];
    shipmentLineItems?: LineItem[];
    lineItems?: LineItem[];
}
