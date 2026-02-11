import type { ProductModel } from "../../models/ProductModel";
import { highlightedProducts, products } from '../../data/dummyDB/productsDatabase'
import type { ProductType } from "../../models/ProductType";
import { types } from "./productTypesDatabase";
import type { MenuElementModel } from "../../models/MenuElementModel";

/* export function getItems(key: string):ProductModel[]{
    const productType = getItemsParams(key);

    if (productType == types[0])
        return products.filter(item => item.title.toLowerCase().includes(key.toLowerCase()));

    if(!productType) return [];

    return products.filter(item => item.productType.id === productType.id);
} */

export async function checkConnection2API(): Promise<boolean> {
    const response = await fetch(`http://localhost:3000/`);

    if(!response)
        return false;

    return response.ok;
}

export async function fetchAllProducts(): Promise<ProductModel[]>{
    const response = await fetch(`http://localhost:3000/products/`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductModel[];
}

export async function fetchAllProductsByTypeId(id: string): Promise<ProductModel[]>{
    const response = await fetch(`http://localhost:3000/products/types/${id}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductModel[];
}

export async function fetchAllProductsByTypeKey(key: string): Promise<ProductModel[]>{
    const response = await fetch(`http://localhost:3000/products/types/key/${key}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductModel[];
}

export async function fetchMenu(): Promise<MenuElementModel[]> {
    const response = await fetch(`http://localhost:3000/menu/`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as MenuElementModel[];
}

/* export function getFilteredItems(params: Record<string, string[]>, type: ProductType | undefined, searchPhrase: string):ProductModel[]{

    let result: ProductModel[];

    console.log(searchPhrase);
    

    if(type?.id === -1){
        result = products.filter(item => item.title.toLowerCase().includes(searchPhrase.toLowerCase()));
    }
    else{
        result = products.filter(t => t.productType.id === type?.id);
    }

    console.log(result);
    

    Object.entries(params).forEach(([key, values]) => {
        console.log(key, values);

        if (!values || values.length === 0) return;
        if (values.every(v => v === '')) return;

        if(key == '501' && values[0] !== ''){
            result = result.filter(t => t.price >= parseFloat(values[0]))
        }
        else if(key == '502' && values[0] !== ''){
            result = result.filter(t => t.price <= parseFloat(values[0]))
        }
        else{
            result = result.filter(product =>
                product.specifications.some(spec =>
                    spec.id === key &&
                    values.some(v => v.toLowerCase() === spec.value.toLowerCase())
                    
                )
            );
        }
    });
    
    return result;
} */

export async function fetchFilteredItems(productType: string, params: Record<string,string[]>): Promise<ProductModel[]> {
    console.log("Ffetching with parameter id's: ",productType,", ", params);

    const searchParams = new URLSearchParams({
        type: productType
    });

    Object.entries(params).forEach(([key, values]) => {
        values.forEach(v => searchParams.append(key,v));
    })

    const response = await fetch(`http://localhost:3000/products/findwithparams?${searchParams.toString()}`)
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductModel[];
}

/* export function getItem(id: string): ProductModel | undefined{
    return products.find(item => item.id === id);
} */

export async function fetchItemById(id: number): Promise<ProductModel> {
    const response = await fetch(`http://localhost:3000/products/${id}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductModel;
}

/* export function getItemsParams(key: string): ProductType | undefined{
    const params = types.find(type => type.title.toLowerCase() == key.toLowerCase()); 

    if(!params) return types[0];

    return params;
} */

export async function fetchProductTypeByKey(key: string): Promise<ProductType> {
    const response = await fetch(`http://localhost:3000/products/types/${key}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductType;
}

/*export function getHighlightedItems(): ProductModel[]{
    return highlightedProducts;
}*/

export async function fetchHighlightedItems(): Promise<ProductModel[]>{
    const response = await fetch(`http://localhost:3000/products/high`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductModel[];
}