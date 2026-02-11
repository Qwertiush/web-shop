import { Link } from 'react-router';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import type { ProductModel } from '../../models/ProductModel';
import styles from './Item.module.scss'

interface ItemProps{
  item: ProductModel;
  href: string;
}

export const Item: React.FC<ItemProps> = ({item, href}) =>{
  const {add} = useCart();
  const {pushToast} = useToast();
  
  const handleAddingItem2Cart = () => {
    pushToast(`Item ${item.title} added to the cart`);
    add(item.id);
  }


  return (
    <div className={styles.card}>
        <Link className={styles.productData} to={href}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={item.image} alt="404"/>
            </div>
            <div className={styles.productInfo}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.content}>
                {item.description.length > 120
                ? item.description.slice(0, 120) + "..."
                : item.description}
              </div>
            </div>
            <div className={styles.priceContainer}>
                <div className={item.oldPrice < 0 ? styles.newPrice : styles.oldPrice}>{item.oldPrice < 0 ? item.price + item.currency : item.oldPrice + item.currency}</div>
                {item.oldPrice > 0 ? <div className={styles.newPrice}>{item.price + item.currency}</div> : ""}
                <button className={styles.button} onClick={handleAddingItem2Cart}>add to cart</button>
            </div>
        </Link>
    </div>
    );
}