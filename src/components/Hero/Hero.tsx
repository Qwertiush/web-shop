import styles from './Hero.module.scss'
import { SpecialItem } from '../../SpecialItem/SpecialItem';
import { useEffect, useState } from 'react';
import type { ProductModel } from '../../models/ProductModel';
import { fetchHighlightedItems } from '../../data/dummyDB/dbAPI';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { useNavigate } from 'react-router';

interface HeroProps{

}

export const Hero: React.FC<HeroProps> = ({}) =>{
  const [promoItems, setPromoItems] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(()=>{
  
    const getData = async () => {
      setLoading(true);
      setPromoItems(await fetchHighlightedItems());
      setLoading(false);
    }
    getData();
  
  },[])

  const handleProductPress = (item: ProductModel) => {
    console.log(item.title + " pressed");

    navigate(`/product/${item.id}`);
  }

  if(loading)
    return <LoadingComponent text='loading...'/>
    
  return (
    <div className={styles.parentContainer}>
      <div className={styles.title}>
        Check out our special offers!!!
      </div>
      <div className={styles.itemsContainer}>
        {promoItems.map((item)=>{
          return <SpecialItem key={item.id} item={item} onClick={()=>handleProductPress(item)}/>
        })}
      </div>
    </div>
  );
}