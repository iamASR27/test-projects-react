import React, { useContext } from 'react';
import AddShirtForm from './AddShirtForm';
import styles from './ShirtList.module.css';
import CartContext from '../Store/cart-context';

const ShirtList = ({ shirts }) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount, shirt) => {
    cartCtx.addItems({
      id: shirt.id,
      name: shirt.name,
      amount: amount,
      price: shirt.price,
    });
  };

  
  

  return (
    <div className={styles.shirtlist}>
      <ul className={styles.list}>
        {shirts.map((shirt) => (
          <li key={shirt.id}>
            <div>
              <h3>{shirt.name} ({shirt.size})</h3>
              <div className={styles.description}>
                {shirt.description}
                <div className={styles.price}>Rs.{shirt.price}</div>
              </div>
            </div>
            <div>
              <AddShirtForm shirt={shirt} onAddToCart={addToCartHandler} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShirtList;
