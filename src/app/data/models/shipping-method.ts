import { DeliveryLeadTime } from "./delivery-lead-time";

export interface ShippingMethod {
    id?: string;
    name?: string;
    currencyCode?: string;
    priceAmountCents?: number;
    priceAmountFloat?: number;
    formattedPriceAmount?: number;
    freeOverAmountCents?: number;
    freeOverAmountFloat?: number;
    formattedFreeOverAmount?: number;
    priceAmountForShipmentCents?: number;
    priceAmountForShipmentFloat?: number;
    formattedPriceAmountForShipment?: number;
    shipmentId?: string;
    deliveryLeadTimeId?: string;
    deliveryLeadTime?: DeliveryLeadTime;
}