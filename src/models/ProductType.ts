export interface ProductTypeParameter {
  id: string;
  name: string;
  type: 'dropdown' | 'input' | 'checkbox';
  values?: string[]; // dropdown exclusive
}
// ProductTypeParameterValue - in DB 

export interface ProductType {
  title: string;
  id?: string;
  productParameters: ProductTypeParameter[]
}