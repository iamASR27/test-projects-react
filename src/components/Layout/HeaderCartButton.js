import React, { useContext } from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../Store/cart-context';

const HeaderCartButton = ({ onClick }) => {
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0)

    return <button className={styles.button} onClick={onClick}>
        <span className={styles.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton;