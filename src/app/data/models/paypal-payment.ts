import { PaymentSource } from "./payment-source";

export interface PaypalPayment extends PaymentSource {
    orderId?: string;
    paypalId?: string;
    paypalPayerId?: string;
}
