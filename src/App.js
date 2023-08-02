import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductDisplay from "./components/ProductDisplay";
import "./App.css";

const App = () => {
  // const [formData, setFormData] = useState([]);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    const storedProducts = Object.keys(localStorage).map((productId) =>
      JSON.parse(localStorage.getItem(productId))
    );
    setProducts(storedProducts);
  }, []);

  const addProductHandler = (productId, price, name, category) => {
    const productData = {
      id: productId,
      price,
      name,
      category,
    };

    localStorage.setItem(productId, JSON.stringify(productData));
    setProducts([...products, productData]);
  };

  const deleteProductHandler = (productId) => {
    localStorage.removeItem(productId);
    setProducts(products.filter((data) => data.id !== productId));
  };

  // const addProductHandler = (id, price, name, category) => {
  //   setFormData((prevFormData) => {
  //     return [...prevFormData, {Product_id: id, price: price, name: name, category: category}]
  //   })
  // }

  // const deleteProductHandler = (ProductId) => {
  //   setFormData((prevFormData) => prevFormData.filter((data) => data.Product_id !== ProductId)
  //   )
  // }
  return (
    <div className="App">
      <ProductForm onAddProduct={addProductHandler} />
      <h2>Products List</h2>
      <ProductDisplay onFormData={products} onDelete={deleteProductHandler} />
    </div>
  );
};

export default App;
