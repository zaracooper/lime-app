export interface Price {
    id: string;
    currencyCode: string;
    skuCode: string;
    amountCents: number;
    amountFloat: number;
    formattedAmount: string;
    compareAtAmountCents: number;
    compareAtAmountFloat: number;
    formattedCompareAtAmount: string;
}
