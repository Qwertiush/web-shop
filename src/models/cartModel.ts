import type { ProductModel } from "./ProductModel";

export type CartState = Record<number, number>;

export interface ItemInTheCartModel{
    item: ProductModel;
    quantity: number;
}