import React from 'react';
import HeaderCartIcon from './HeaderCartIcon';
// import Container from 'react-bootstrap/Container';
import "./Header.css";


const Header = () => {
    return (
        <div className='header'>
            <div>
           <h2 className='shop-title'>Medicine Shop</h2>
           </div>
           <div className='header-cart-icon'>
           <HeaderCartIcon />
           </div>
        </div>
   
      );
    }


export default Header;