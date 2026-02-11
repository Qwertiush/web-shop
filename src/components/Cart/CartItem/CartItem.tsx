import { useCart } from "../../../contexts/CartContext";
import { useToast } from "../../../contexts/ToastContext";
import type { ItemInTheCartModel } from "../../../models/cartModel";
import styles from './CartItem.module.scss'

interface CartItemProps{
  item: ItemInTheCartModel
}

export const CartItem: React.FC<CartItemProps> = ({item}) =>{
  const { remove, setQty } = useCart();
  const { pushToast } = useToast();

  const handleChangingQuantity = (n:number) => {
    setQty(item.item.id,item.quantity + n);
  }

  const handleRamovingItem = () => {
    pushToast('Item removed from the cart.');
    remove(item.item.id);
  }

  return (
    <div className={styles.card}>
        <div className={styles.productData}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={item.item.image} alt="404"/>
            </div>
            <div className={styles.title}>{item.item.title}</div>
            <div className={styles.priceContainer}>
                <div className={item.item.oldPrice < 0 ? styles.newPrice : styles.oldPrice}>{item.item.oldPrice < 0 ? item.item.price + item.item.currency : item.item.oldPrice + item.item.currency}</div>
                {item.item.oldPrice > 0 ? <div className={styles.newPrice}>{item.item.price + item.item.currency}</div> : ""}
            </div>
            <div className={styles.title} >{item.quantity}</div>
            <div className={styles.buttons}>
                <button className={styles.buttonQty} onClick={()=>handleChangingQuantity(1)}>+</button>
                <button className={styles.buttonQty} onClick={()=>handleChangingQuantity(-1)}>-</button>
                <button className={styles.buttonRemove} onClick={handleRamovingItem}>X</button>
            </div>
        </div>
    </div>
    );
}