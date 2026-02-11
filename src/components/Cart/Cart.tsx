import styles from './Cart.module.scss'
import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext"
import { fetchItemById } from "../../data/dummyDB/dbAPI";
import type { ItemInTheCartModel } from "../../models/cartModel";
import { usePreferences } from '../../contexts/PreferencesContext';
import { CartItem } from './CartItem/CartItem';
import { useToast } from '../../contexts/ToastContext';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';

export const Cart = () => {
  const { cart, clear } = useCart();
  const { preferences } = usePreferences();
  const { pushToast } = useToast();

  const [items, setItems] = useState<ItemInTheCartModel[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
        setLoading(true);

        const entries = Object.entries(cart);

        const items = await Promise.all(
            entries.map(async ([key, quantity]) => {
                const id = Number(key);
                const item = await fetchItemById(id);

                if (!item) return null;

                return { item, quantity };
            })
        );

        const filteredItems = items.filter(
            (i): i is ItemInTheCartModel => i !== null
        );

        setItems(filteredItems);

        // liczenie totalu TU, bo mamy dane
        const total = filteredItems.reduce((sum, { item, quantity }) => {
            const price = Math.round(item.price * 100);
            return sum + price * quantity;
        }, 0) / 100;

        setTotal(total);

        setLoading(false);
    };

    getData();
  }, [cart]);


  const handlePayment = () => {
    if(Object.keys(cart).length === 0){
        pushToast("Cart is empty, In those parts of the world this is considered an invalid transaction. :(", 8000);
        return;
    }

    console.log("Chill, Chill, Chill, Big Smoke, It's me...");
    pushToast("Sorry, those items are unavalible for purchase. :(");
  }

  if(loading)
    return <LoadingComponent text='Cart is loading...'/>

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
                <div key={item.item.id} className={styles.itemContainer}>
                    <CartItem item={item}/>  
                </div>
                );
            })}
        </div>
    </div>
  )
}