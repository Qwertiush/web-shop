import type { ProductModel } from "../../models/ProductModel";
import type { ProductType } from "../../models/ProductType";
import type { MenuElementModel } from "../../models/MenuElementModel";
import type { FilteredItemsModel } from "../../models/FilteredItemsModel";

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

export async function fetchFilteredItems(productType: string, params: Record<string,string[]>, page?: number, limit?: number): Promise<FilteredItemsModel> {
    console.log("Ffetching with parameter id's: ",productType,", ", params);

    const searchParams = new URLSearchParams({
        type: productType,
        page: String(page ?? 1),
        limit: String(limit ?? 5)
    });

    Object.entries(params).forEach(([key, values]) => {
        values.forEach(v => searchParams.append(key,v));
    })

    const response = await fetch(`http://localhost:3000/products/findwithparams?${searchParams.toString()}`)
    
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as FilteredItemsModel;
}

export async function fetchItemById(id: number): Promise<ProductModel> {
    const response = await fetch(`http://localhost:3000/products/${id}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductModel;
}

export async function fetchProductTypeByKey(key: string): Promise<ProductType> {
    const response = await fetch(`http://localhost:3000/products/types/${key}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductType;
}

export async function fetchHighlightedItems(): Promise<ProductModel[]>{
    const response = await fetch(`http://localhost:3000/products/high`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json() as ProductModel[];
}