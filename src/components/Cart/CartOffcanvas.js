import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './CartOffcanvas.css';
import CartContext from "../../store/cart-context";


function CartOffcanvas({ show, onHide }) {
  const cartCtx = useContext(CartContext);


  const handleRemoveItem = (cartItem) => {
    cartCtx.removeFromCart(cartItem);
  };

  const totalAmount = cartCtx.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartCtx.cartItems.map((cartItem) => (
              <tr key={cartItem.id}>
                <td className="cart-item">
                  <h2>{cartItem.name}</h2>
                </td>
                <td>{cartItem.price}</td>
                <td>{cartItem.quantity}</td>
                <td>
                  <Button variant="danger" className="p-1" style={{fontSize: "14px"}} onClick={() => handleRemoveItem(cartItem)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Offcanvas.Body>
      <div className="btn-purchase">
      <p className="total-amount">Total Amount: ${totalAmount.toFixed(2)}</p>
        <Button variant="success">Order</Button>
        </div>
    </Offcanvas>
  );
}

export default CartOffcanvas;
