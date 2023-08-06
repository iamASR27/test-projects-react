import React, { useState } from "react";
import CartContext from "./cart-context";

// const defaultCartState = {
//     items: [],
//     totalAmount: 0,
// }

// const cartReducer = (state, action) => {
//     if (action.type === 'ADD') {
//         const updatedItems = state.items.concat(action.item);
//         const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
//         return {
//           items: updatedItems,
//           totalAmount: updatedTotalAmount,
//         }
//     }
//     return defaultCartState;
// }

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addItemToCartHandler = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].amount += item.amount;
        return updatedItems;
      } else {
        return prevItems.concat(item);
      }
    });

    setTotalAmount(
      (prevTotalAmount) => prevTotalAmount + item.price * item.amount
    );
  };
  // const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  //   const addItemToCartHandler = (item) => {
  //     // dispatchCartAction({type: 'ADD', item: item})
  //   };

  //   const removeItemToCartHandler = (id) => {
  //     // dispatchCartAction({type: 'REMOVE', id: id})
  //   };

  const cartContext = {
    items: cartItems, //cartState.items
    totalAmount: totalAmount, //cartState.totalAmount
    addItem: addItemToCartHandler,
    //removeItem: removeItemToCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
