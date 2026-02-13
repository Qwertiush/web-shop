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
      <div className={styles.productHeader}>
      
        <div className={styles.imageSection}>
          <img src={item.image} alt={item.title} />
        </div>

        <div className={styles.priceSection}>
          <h1 className={styles.title}>{item.title}</h1>

          <div className={styles.priceContainer}>
            {item.oldPrice > 0 ? (
              <>
                <div className={styles.oldPrice}>
                  {item.oldPrice}{item.currency}
                </div>
                <div className={styles.newPrice}>
                  {item.price}{item.currency}
                </div>
              </>
            ) : (
              <div className={styles.newPrice}>
                {item.price}{item.currency}
              </div>
            )}

            <button
              data-testid ='add-to-cart'
              className={styles.addToCartButton}
              onClick={handleAddingToCart}
            >
              Add to cart
            </button>
          </div>
        </div>

      </div>

      <div className={styles.infoSection}>
        <div className={styles.specifications}>
          {item.specifications.map(spec => (
            <div key={spec.id} className={styles.specItem}>
              <span className={styles.specTitle}>{spec.title}</span>
              <span className={styles.specValue}>{spec.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.description}>
          {item.description}
        </div>
      </div>
    </div>
  );

}
