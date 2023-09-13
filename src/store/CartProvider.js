import React, { useState, useCallback, useEffect, useContext } from "react";
import CartContext from "./cart-context";
import ItemContext from "./item-context";

const CartProvider = ({ children }) => {
  const ctx = useContext(ItemContext);
  const [cartItems, setCartItems] = useState([]);
  const url = `https://crudcrud.com/api/a700fd61a14745bbbd59fe9d679b890a`;

  const addToCart = async (item) => {
    console.log("add to cart clicked")
    try {
      setCartItems([...cartItems, item]);
      await fetch(`${url}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          // totalQuantity: item.totalQuantity,
          quantity: 1,
        }),
      });
     fetchCartItems();
     ctx.fetchItems();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch(`${url}/cart`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart items.");
      }
      const data = await response.json();

      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, [url]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const removeFromCart = async (cartItem) => {
    const updatedCart = cartItems.filter((item) => item.id !== cartItem.id);
    setCartItems(updatedCart);

    await fetch(`${url}/cart/${cartItem._id}`, {
      method: "DELETE",
    });
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const cartContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    fetchCartItems,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
