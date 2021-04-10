export interface Order {
    id?: string;
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