import type { ProductModel } from "../../models/ProductModel";
import { highlightedProducts, products } from '../../data/dummyDB/productsDatabase'
import type { ProductType } from "../../models/ProductType";
import { types } from "./productTypesDatabase";

export function getItems(key: string):ProductModel[]{
    const productType = getItemsParams(key);

    if (productType == types[0])
        return products.filter(item => item.title.toLowerCase().includes(key.toLowerCase()));

    if(!productType) return [];

    return products.filter(item => item.productType.id === productType.id);
}

export function getFilteredItems(params: Record<string, string[]>, type: ProductType | undefined, searchPhrase: string):ProductModel[]{

    let result: ProductModel[];

    console.log(searchPhrase);
    

    if(type?.id === '-1'){
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
                product.specification.some(spec =>
                    spec.id === key &&
                    values.some(v => v.toLowerCase() === spec.value.toLowerCase())
                    
                )
            );
        }
    });
    
    return result;
}

export function getItem(id: string): ProductModel | undefined{
    return products.find(item => item.id === id);
}

export function getItemsParams(key: string): ProductType | undefined{
    const params = types.find(type => type.title.toLowerCase() == key.toLowerCase()); 

    if(!params) return types[0];

    return params;
}

export function getHighlightedItems(): ProductModel[]{
    return highlightedProducts;
}