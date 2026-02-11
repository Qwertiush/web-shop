import type { ProductType } from "./ProductType";

export interface SpecificationModel{
  id: string;
  title: string;
  value: string;
}

export interface ProductModel {
  title: string;
  price: number;
  oldPrice: number;
  currency: string;
  description: string;
  specifications: SpecificationModel[];
  image: string;
  id: string;
  productType: ProductType
}