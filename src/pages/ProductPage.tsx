import { useParams } from "react-router"
import { ProductContainer } from "../components/ProductCantainer/ProductContainer";
import { useEffect, useState } from "react";
import { fetchItemById } from "../data/dummyDB/dbAPI";
import type { ProductModel } from "../models/ProductModel";
import { LoadingComponent } from "../components/LoadingComponent/LoadingComponent";

export const ProductPage: React.FC = () => {

  const {id} = useParams<{id: string}>();

  const [product, setProduct] = useState<ProductModel | null>(null);

  useEffect(()=>{
    const getItem = async () => {
      if(id){
        const item = await fetchItemById(+id);
        console.log(item);
        setProduct(item);
      }
    }
    getItem();
  },[id])

  if(!product){
    return <LoadingComponent text="Product is loading"/>
  }

  return <ProductContainer item={product}/>;

}
