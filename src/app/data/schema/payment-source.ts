export interface PaymentSource {
    approvalUrl?: string;
    cancelUrl?: string;
    id?: string;
    name?: string;
    noteToPayer?: string;
    paypalId?: string;
    paypalPayerId?: string;
    returnUrl?: string;
    status?: string;
}