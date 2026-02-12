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

export const defaultProduct: ProductModel = {
  id: '0',
  title: 'Unknown product',
  description: '',
  price: 0,
  oldPrice: 0,
  currency: 'NaN',
  image: '404',
  productType: {title: "undefined", parameters: []},
  specifications: [],
};