import React, { createContext, useEffect, useState, useCallback } from 'react';

const ItemContext = createContext({
  items: [],
  fetchItems: () => {},
  handleTotalQuantity: () => {},
});



export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  // const [totalQuantity, setTotalQuantity] = useState(null);

  const url = `https://crudcrud.com/api/a700fd61a14745bbbd59fe9d679b890a`;

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(`${url}/List`);
      if (!response.ok) {
        throw new Error('Failed to fetch items.');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [url]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems])

  const handleTotalQuantity = useCallback(async (updatedItem) => {

    try {
      const response = await fetch(`${url}/List/${updatedItem._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch the latest item data.');
      }
      const itemData = await response.json();
      const newTotalQuantity = itemData.totalQuantity - 1;

      if (newTotalQuantity <= 0) {
        await fetch(`${url}/List/${updatedItem._id}`, {
          method: 'DELETE',
        });
      } else {
        await fetch(`${url}/List/${updatedItem._id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: updatedItem.id,
            name: updatedItem.name,
            description: updatedItem.description,
            price: updatedItem.price,
            totalQuantity: newTotalQuantity,
          })
        });
      }
      fetchItems();
    } catch (error) {
      console.error("Error updating total quantity in the backend:", error);
    }
  }, [url, fetchItems]);

  // const updateTotalQuantity = useCallback((updatedItem) => {
   
  //   handleTotalQuantity(updatedItem);
    
  // }, [handleTotalQuantity]);

  // useEffect(() => {
  //   handleTotalQuantity(updatedItem);
  // }, [handleTotalQuantity])

  const contextValue = {
    items,
    fetchItems,
    // updateTotalQuantity,
    handleTotalQuantity,
  };

  return (
    <ItemContext.Provider value={contextValue}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
