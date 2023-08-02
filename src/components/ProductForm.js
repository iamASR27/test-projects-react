import React, { useState } from "react";
import Button from "./Button/Button";
import styles from "./ProductForm.module.css";

const ProductForm = (props) => {
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("electronics")

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddProduct(productId, price, name, category);

    const productData = {
      id: productId,
      price,
      name,
      category,
    };

    // const existingData = localStorage.getItem(orderId);
    // const updatedData = [...existingData, orderData];

    localStorage.setItem(productId, JSON.stringify(productData));

    setProductId("");
    setPrice("");
    setName("");
  };

  const idChangeHandler = (event) => {
    setProductId(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form_container}>
      <div className={styles.product_form}>
        <label htmlFor="product_id">Unique Product ID:</label>
        <input type="number" id="product_id" value={productId} onChange={idChangeHandler} required />
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={priceChangeHandler} required />
        <label htmlFor="name">Product Name:</label>
        <input type="text" id="name" value={name} onChange={nameChangeHandler} required />
        <label htmlFor="select-category">Choose a category:</label>
        <select id="select-category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="electronics">Electronics</option>
          <option value="food">Food</option>
          <option value="skincare">Skincare</option>
        </select>
      </div>
      <div>
        <Button id="product_submit" type="submit">
          Add Product
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
