import React, { useState } from 'react';
import styles from './ShirtForm.module.css';

const ShirtForm = ({ addShirtToList }) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('medium'); 
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleAddShirt = () => {
    if (name && size && description && price) {
      const newTshirt = {
        id: Date.now(),
        name,
        size,
        description,
        price: parseFloat(price),
      };
      addShirtToList(newTshirt);
      setName('');
      setSize('medium');
      setDescription('');
      setPrice('');
    }
  };

  return (
    <div className={styles.shirtform}>
      <input
        type="text"
        placeholder="Shirt Brand"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
       <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
      
      <button onClick={handleAddShirt}>Add to List</button>
    </div>
  );
};

export default ShirtForm;
