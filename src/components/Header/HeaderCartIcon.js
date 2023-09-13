import React,{ useState, useContext} from "react";
// import Nav from "react-bootstrap/Nav";
import { FaShoppingCart } from "react-icons/fa";
import CartOffcanvas from "../Cart/CartOffcanvas";
import "./HeaderCartIcon.css";
import CartContext from "../../store/cart-context";



const HeaderCartIcon = () => {
  const cartCtx = useContext(CartContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCartIconClick = () => {
    setShowOffcanvas(true);
  };

  const handleCloseOffcanvas = () => {
    setShowOffcanvas(false);
  };

  const totalAmount = cartCtx.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
        <div
          className="cart-icon"
          onClick={handleCartIconClick}
        >
          <FaShoppingCart />
          <span className="cart-icon-badge">{totalAmount}</span>
        </div>
      
      <CartOffcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} />
    </>
  );
};

export default HeaderCartIcon;
