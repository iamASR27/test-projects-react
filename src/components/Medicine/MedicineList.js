import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import "./MedicineList.css";
import ItemContext from "../../store/item-context";
import CartContext from "../../store/cart-context";

function MedicineList() {
  const ctx = useContext(ItemContext);
  const cartCtx = useContext(CartContext);
  const url = `https://crudcrud.com/api/a700fd61a14745bbbd59fe9d679b890a`;


  const handleAddToCart = async (item) => {
   
    const existingCartItem = cartCtx.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    console.log("existingCartItem:", existingCartItem);
    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };

      cartCtx.updateQuantity(existingCartItem.id, updatedCartItem.quantity);
      console.log("updatedCartItem:", updatedCartItem);
      console.log(existingCartItem._id);

      try {
        await fetch(`${url}/cart/${existingCartItem._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: updatedCartItem.id,
            name: updatedCartItem.name,
            description: updatedCartItem.description,
            price: updatedCartItem.price,
            quantity: updatedCartItem.quantity,
          }),
        });
        cartCtx.fetchCartItems();
        // ctx.updateTotalQuantity(item);
      } catch (error) {
        console.error("Error updating quantity in the backend:", error);
      }
    } else {
      console.log("add");
      cartCtx.addToCart({ ...item, quantity: 1 });
      // ctx.updateTotalQuantity(item);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Medicine List</h2>
      {ctx.items.length === 0 && (
        <p style={{ textAlign: "center" }}>No medicines in Stock.</p>
      )}
      {ctx.items.length > 0 && (
        <div className="medicine-list">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity Available</th>
              </tr>
            </thead>
            <tbody>
              {ctx.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.totalQuantity}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => {
                        handleAddToCart(item);
                        ctx.handleTotalQuantity(item);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default MedicineList;
