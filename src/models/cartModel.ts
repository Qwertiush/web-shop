import type { ProductModel } from "./ProductModel";

export type CartState = Record<string, number>;

export interface ItemInTheCartModel{
    item: ProductModel;
    quantity: number;
}