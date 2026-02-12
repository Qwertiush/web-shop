import { defaultProduct, type ProductModel } from "../../models/ProductModel";
import { defaultProductType, type ProductType } from "../../models/ProductType";
import type { MenuElementModel } from "../../models/MenuElementModel";
import type { FilteredItemsModel } from "../../models/FilteredItemsModel";

const timeoutLimit = 5000;

export async function checkConnection2API(): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutLimit);

    try {
        const response = await fetch(`http://localhost:3000/`,{
          signal: controller.signal
        });
        return response.ok;
    } catch (err) {
        return false;
    } finally{
      clearTimeout(timeout);
    }
}

export async function fetchAllProducts(): Promise<ProductModel[]>{
    try{
      const response = await fetch(`http://localhost:3000/products/`);

      if (!response.ok) {
        console.error('Fetch error:', response.status, response.statusText);
        return [];
      }

      const data = await response.json() as ProductModel[];
      return data;
    } catch(err){
      console.error('Network error:', err);
      return [];
    }
}

export async function fetchAllProductsByTypeId(id: string): Promise<ProductModel[]>{
    try{
      const response = await fetch(`http://localhost:3000/products/types/${id}`);

      if (!response.ok) {
        console.error('Fetch error:', response.status, response.statusText);
        return [];
      }

      const data = await response.json() as ProductModel[];
      return data;
    } catch(err){
      console.error('Network error:', err);
      return [];
    }
}

export async function fetchAllProductsByTypeKey(key: string): Promise<ProductModel[]>{
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutLimit);

  try{
    const response = await fetch(`http://localhost:3000/products/types/key/${key}`,{
      signal: controller.signal
    });

    if (!response.ok) {
      console.error('Fetch error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json() as ProductModel[];
    return data;

  } catch(err){
    console.error('Network error:', err);
    return [];
  } finally{
    clearTimeout(timeout);
  }
}

export async function fetchMenu(): Promise<MenuElementModel[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutLimit);

  try{
    const response = await fetch(`http://localhost:3000/menu/`,{
      signal: controller.signal
    });

    if (!response.ok) {
      console.error('Fetch error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json() as MenuElementModel[];
    return data;
  } catch(err){
    console.error('Network error:', err);
    return [];
  } finally{
    clearTimeout(timeout);
  }
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

    try {
        const response = await fetch(`http://localhost:3000/products/findwithparams?${searchParams.toString()}`);
        
        if (!response.ok) {
            console.error('Fetch error:', response.statusText);
            return { data: [], page: 1, lastPage: 1, total: 0};
        }

        const data = await response.json() as FilteredItemsModel;
        return data;
    } catch (err) {
        console.error('Network error:', err);
        return { data: [], page: 1, lastPage: 1, total: 0};
    }
}

export async function fetchItemById(id: number): Promise<ProductModel> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutLimit);

  try{
    const response = await fetch(`http://localhost:3000/products/${id}`,{
      signal: controller.signal
    });

    if (!response.ok) {
      console.error('Fetch error:', response.status, response.statusText);
      return defaultProduct;
    }

    const data = await response.json() as ProductModel;
    return data;
  } catch(err){
    console.error('Network error:', err);
    return defaultProduct;
  } finally{
    clearTimeout(timeout);
  }
}

export async function fetchProductTypeByKey(key: string): Promise<ProductType> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutLimit);

  try{
    const response = await fetch(`http://localhost:3000/products/types/${key}`,{
      signal: controller.signal
    });

    if (!response.ok) {
      console.error('Fetch error:', response.status, response.statusText);
      return defaultProductType;
    }

    const data = await response.json() as ProductType;
    return data;
  }catch(err){
    console.error('Network error:', err);
    return defaultProductType;
  } finally{
    clearTimeout(timeout);
  }
}

export async function fetchHighlightedItems(): Promise<ProductModel[]>{
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutLimit);

  try{
    const response = await fetch(`http://localhost:3000/products/high`,{
      signal: controller.signal
    });

    if (!response.ok) {
      console.error('Fetch error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json() as ProductModel[];
    return data;
  }catch(err){
    console.error('Network error:', err);
    return [];
  } finally{
    clearTimeout(timeout);
  }
}