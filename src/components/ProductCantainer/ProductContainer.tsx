import styles from './ProductContainer.module.scss'
import type React from "react"
import type { ProductModel } from "../../models/ProductModel"
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../../contexts/ToastContext'

interface ProductContainerProps{
    item: ProductModel | undefined
}

export const ProductContainer: React.FC<ProductContainerProps> = ({item}) => {

  const {add} = useCart();
  const {pushToast} = useToast();

  const handleAddingToCart = () => {
    if(!item)
      return;

    add(item.id);
    pushToast('Item added to the cart.')
  }

  if (!item) return <div>Product not found</div>;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.imageSection}>
        <img src={item.image} alt={item.title} />
      </div>

      <div className={styles.detailsSection}>
        <h1 className={styles.title}>{item.title}</h1>

        <div className={styles.priceContainer}>
          <div className={item.oldPrice < 0 ? styles.originalPrice : styles.salePrice}>{item.oldPrice < 0 ? item.price : item.oldPrice + item.currency}</div>
          {item.oldPrice > 0 ? <div className={styles.originalPrice}>{item.price + item.currency}</div> : ""}
        </div>

        <div className={styles.description}>
          {item.description}
        </div>

        <div className={styles.specifications}>
          {item.specification.map(spec => (
            <div key={spec.id} className={styles.specItem}>
              <strong>{spec.title}:</strong> {spec.value}
            </div>
          ))}
        </div>

        <button
          className={styles.addToCartButton}
          onClick={handleAddingToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
