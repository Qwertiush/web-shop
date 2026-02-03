import type { ProductType } from "./ProductType";

export interface MenuElementModel {
  title: string;
  id?: string;
  dropdownElements: ProductType[];
}
