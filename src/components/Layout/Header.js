import React from 'react';
import HeaderCartButton from './HeaderCartButton';
import shirtImage from './shirtImage.avif';
import styles from './Header.module.css';

const Header = ({ onShowCart }) => {
    return <>
    <header className={styles.header}>
        <h1>Shirt Shop!</h1>
        <HeaderCartButton onClick={onShowCart}/>
    </header>
    <div className={styles['main-image']}>
        <img src={shirtImage} alt="shirts" />
    </div>
    </>
}

export default Header;