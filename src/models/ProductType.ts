export interface ProductTypeParameter {
  id: number;
  name: string;
  type: 'dropdown' | 'input' | 'checkbox';
  values?: ProductParameterValues[]; // dropdown exclusive
}

export interface ProductType {
  title: string;
  key?: string;
  id?: number;
  parameters: ProductTypeParameter[]
}

export interface ProductParameterValues{
  id: number;
  value: string;
}