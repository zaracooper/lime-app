import { LineItem } from "./line-item";

export interface Order {
    id?: string;
    number?: number;
    skusCount?: number;
    lineItems?: LineItem[];
    formattedSubtotalAmount?: string;
    formattedDiscountAmount?: string;
    formattedShippingAmount?: string;
    formattedTotalTaxAmount?: string;
    formattedGiftCardAmount?: string;
    formattedTotalAmountWithTaxes?: string;
}

export enum GetOrderParams {
    cart = 'forCart',
    availablePaymentMethods = 'withAvailablePaymentMethods',
    paymentSource = 'withpaymentSource',
    paymentMethod = 'withpaymentMethod',
    none = 'none'
}

export enum UpdateOrderParams {
    customerEmail,
    billingAddress,
    billingAddressClone,
    shippingAddressSameAsBilling,
    shippingAddressClone,
    billingAddressSameAsShipping,
    shippingAddress,
    paymentMethod,
    giftCardOrCouponCode,
    giftCardCode,
    couponCode,
    place,
}