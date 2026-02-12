import type { ProductModel } from "./ProductModel";

export interface FilteredItemsModel{
    data: ProductModel[];
    lastPage: number;
    page: number;
    total: number;
}