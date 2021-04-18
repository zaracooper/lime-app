export interface PaypalPayment {
    approvalUrl?: string;
    id?: string;
    orderId?: string;
    cancelUrl?: string;
    returnUrl?: string;
    name?: string;
    noteToPayer?: string;
    paypalId?: string;
    paypalPayerId?: string;
    status?: string;
}
