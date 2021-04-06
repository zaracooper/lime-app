import { Price } from "./price";

export interface Sku {
    id: string;
    name: string;
    imageUrl: string;
    code: string;
    description: string;
    prices: Price[];
    __collectionMeta: {
        recordCount: number;
        pageCount: number;
    };
}
