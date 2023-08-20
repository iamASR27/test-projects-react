import React, { useState } from "react";
import Header from "./components/Layout/Header";
import ShirtForm from "./components/Shirts/ShirtForm";
import ShirtList from "./components/Shirts/ShirtList";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/Store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [shirts, setShirts] = useState([]);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const addShirtToList = (newShirt) => {
    setShirts((prevShirts) => [...prevShirts, newShirt]);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <ShirtForm addShirtToList={addShirtToList} />
      <ShirtList shirts={shirts} />
    </CartProvider>
  );
}

export default App;
