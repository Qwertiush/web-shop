import styles from './Cart.module.scss'
import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext"
import { getItem } from "../../data/dummyDB/dbAPI";
import type { ItemInTheCartModel } from "../../models/cartModel";
import { usePreferences } from '../../contexts/PreferencesContext';
import { CartItem } from './CartItem/CartItem';
import { useToast } from '../../contexts/ToastContext';

export const Cart = () => {
  const { cart, clear } = useCart();
  const { preferences } = usePreferences();
  const { pushToast } = useToast();

  const [items, setItems] = useState<ItemInTheCartModel[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(()=>{
    let result: ItemInTheCartModel[] = [];

    const getData = () => {
        Object.entries(cart).forEach(([key, value]) => {
            const item = getItem(key);
            if(item){
                result.push({item: item, quantity: value});
            }
        })
        setItems(result);
    }

    const calculateTotal = () => {
        let total: number = 0;
    
        result.forEach(({item, quantity}) => {
            let ultimatePrice: number = item.price;
            
            ultimatePrice = Math.round(ultimatePrice * 100);

            total += ultimatePrice * quantity;
            
        });
        total = total / 100;
        setTotal(total);
    }
    getData();
    calculateTotal();
    
  },[cart])

  const handlePayment = () => {
    if(Object.keys(cart).length === 0){
        pushToast("Cart is empty, In those parts of the world this is considered an invalid transaction. :(", 8000);
        return;
    }

    console.log("Chill, Chill, Chill, Big Smoke, It's me...");
    pushToast("Sorry, those items are unavalible for purchase. :(");
  }

  return (
    <div className={styles.parentContainer}>
        <div className={styles.cartHeader}>
            <button className={styles.button} onClick={clear}>Clear the cart</button>
            <div className={styles.text}>Total: {total} {preferences.currency}</div>
            <button className={styles.button} onClick={handlePayment}>Pay Up!!!</button>
        </div>
        <div className={styles.items}>
            {items.map((item) => {
                return (
                <div className={styles.itemContainer}>
                    <CartItem item={item}/>  
                </div>
                );
            })}
        </div>
    </div>
  )
}