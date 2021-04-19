export interface PaymentSource {
    approvalUrl?: string;
    cancelUrl?: string;
    id?: string;
    name?: string;
    noteToPayer?: string;
    returnUrl?: string;
    status?: string;
}