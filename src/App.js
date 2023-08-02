import React, { useState, useEffect } from "react";
import OrderForm from "./components/OrderForm";
import OrderDisplay from "./components/OrderDisplay";
import "./App.css";

const App = () => {
  // const [formData, setFormData] = useState([]);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const storedOrders = Object.keys(localStorage).map((orderId) =>
      JSON.parse(localStorage.getItem(orderId))
    );
    setOrders(storedOrders);
  }, []);

  const addBillHandler = (orderId, price, dish, table) => {
    const orderData = {
      order_id: orderId,
      price,
      dish,
      table,
    };

    localStorage.setItem(orderId, JSON.stringify(orderData));
    setOrders([...orders, orderData]);
  };

  const deleteBillHandler = (orderId) => {
    localStorage.removeItem(orderId);
    setOrders(orders.filter((data) => data.order_id !== orderId));
  };

  // const addBillHandler = (id, price, dish, table) => {
  //   setFormData((prevFormData) => {
  //     return [...prevFormData, {order_id: id, price: price, dish: dish, table: table}]
  //   })
  // }

  // const deleteBillHandler = (orderId) => {
  //   setFormData((prevFormData) => prevFormData.filter((data) => data.order_id !== orderId)
  //   )
  // }
  return (
    <div className="App">
      <OrderForm onAddBill={addBillHandler} />
      <OrderDisplay onFormData={orders} onDelete={deleteBillHandler} />
    </div>
  );
};

export default App;
