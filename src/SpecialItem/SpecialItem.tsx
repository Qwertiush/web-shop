import type { ProductModel } from '../models/ProductModel'
import styles from './SpecialItem.module.scss'

interface SpecialItemProps{
  item: ProductModel
  onClick: () => {} | void
}

export const SpecialItem: React.FC<SpecialItemProps> = ({item, onClick}) =>{
  return (
    <div className={styles.card} onClick={onClick}>
        <div className={styles.head}>{item.title}</div>
        <div className={styles.imageContainer}>
            <img className={styles.image} src={item.image} alt="404"/>
        </div>
        <div className={styles.priceContainer}>
            <div className={item.oldPrice < 0 ? styles.newPrice : styles.oldPrice}>{item.oldPrice < 0 ? item.price : item.oldPrice + item.currency}</div>
            {item.oldPrice > 0 ? <div className={styles.newPrice}>{item.price + item.currency}</div> : ""}
        </div>
    </div>
    );
}