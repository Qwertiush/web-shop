import { useParams } from "react-router"
import { products } from "../data/dummyDB/productsDatabase";
import { ProductContainer } from "../components/ProductCantainer/ProductContainer";

export const ProductPage: React.FC = () => {

  const {id} = useParams<{id: string}>();

  const product = products.find(p => p.id === id); //TODo move to dummyDB 

  return <ProductContainer item={product}/>;

}
