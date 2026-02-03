import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import type { ProductModel } from '../../models/ProductModel';
import styles from './Item.module.scss'

interface ItemProps{
  item: ProductModel
  onClick: () => {} | void
}

export const Item: React.FC<ItemProps> = ({item, onClick}) =>{
  const {add} = useCart();
  const {pushToast} = useToast();
  
  const handleAddingItem2Cart = () => {
    pushToast(`Item ${item.title} added to the cart`);
    add(item.id);
  }


  return (
    <div className={styles.card}>
        <div className={styles.head}>{item.title}</div>
        <div className={styles.productData} onClick={onClick}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={item.image} alt="404"/>
            </div>
            <div className={styles.content}>{item.description}</div>
            <div className={styles.priceContainer}>
                <div className={item.oldPrice < 0 ? styles.newPrice : styles.oldPrice}>{item.oldPrice < 0 ? item.price : item.oldPrice + item.currency}</div>
                {item.oldPrice > 0 ? <div className={styles.newPrice}>{item.price + item.currency}</div> : ""}
            </div>
        </div>
        <button className={styles.button} onClick={handleAddingItem2Cart}>add to cart</button>
    </div>
    );
}