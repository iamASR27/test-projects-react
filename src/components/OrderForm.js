import React, { useState } from "react";
import Button from "./Button/Button";
import styles from "./OrderForm.module.css";

const OrderForm = (props) => {
  const [orderId, setOrderId] = useState("");
  const [price, setPrice] = useState("");
  const [dish, setDish] = useState("");
  const [table, setTable] = useState("table1")

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddBill(orderId, price, dish, table);

    const orderData = {
      order_id: orderId,
      price,
      dish,
      table,
    };

    // const existingData = localStorage.getItem(orderId);
    // const updatedData = [...existingData, orderData];

    localStorage.setItem(orderId, JSON.stringify(orderData));

    setOrderId("");
    setPrice("");
    setDish("");
  };

  const idChangeHandler = (event) => {
    setOrderId(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const dishChangeHandler = (event) => {
    setDish(event.target.value);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form_container}>
      <div className={styles.order_form}>
        <label htmlFor="order_id">Unique Order ID:</label>
        <input type="number" id="order_id" value={orderId} onChange={idChangeHandler} required />
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={priceChangeHandler} required />
        <label htmlFor="dish">Choose Dish:</label>
        <input type="text" id="dish" value={dish} onChange={dishChangeHandler} required />
        <label htmlFor="select-table">Choose a table:</label>
        <select id="select-table" value={table} onChange={(event) => setTable(event.target.value)}>
          <option value="table1">Table 1</option>
          <option value="table2">Table 2</option>
          <option value="table3">Table 3</option>
        </select>
      </div>
      <div>
        <Button id="bill_submit" type="submit">
          Add to bill
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;
