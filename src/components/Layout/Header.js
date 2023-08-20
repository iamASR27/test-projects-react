import React from 'react';
import HeaderCartButton from './HeaderCartButton';
import candyImage from './candyImage.jpg';
import styles from './Header.module.css';

const Header = ({ onShowCart }) => {
    return <>
    <header className={styles.header}>
        <h1>Shirt Shop!</h1>
        <HeaderCartButton onClick={onShowCart}/>
    </header>
    <div className={styles['main-image']}>
        <img src={candyImage} alt="candies" />
    </div>
    </>
}

export default Header;