import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  // const [cartItems, setCartItems] = useState([]);
  // const [totalAmount, setTotalAmount] = useState(0);

  // const addItemToCartHandler = (item) => {
  //   setCartItems((prevItems) => {
  //     const existingItemIndex = prevItems.findIndex(
  //       (cartItem) => cartItem.id === item.id
  //     );
  //     const existingItem = prevItems[existingItemIndex];
  //     // let updatedItem;
  //     // let updatedItems;
  //     if(existingItemIndex !== -1) {
  //       const updatedItem = {
  //         ...existingItem,
  //         amount: existingItem.amount + cartItems.amount,
  //       };
  //       const updatedItems = [...cartItems]
  //     }
  // if (existingItemIndex !== -1) {
  //   const updatedItems = [...prevItems];
  //   updatedItems[existingItemIndex].amount += item.amount;
  //   return updatedItems;
  // } else {
  //   return prevItems.concat(item);
  // }
  //   });

  //   setTotalAmount(
  //     (prevTotalAmount) => prevTotalAmount + item.price * item.amount
  //   );
  // };
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
