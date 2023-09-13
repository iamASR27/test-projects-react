import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import "./CandyList.css";
import ItemContext from "../../store/item-context";
import CartContext from "../../store/cart-context";

function CandyList() {
  const ctx = useContext(ItemContext);
  const cartCtx = useContext(CartContext);
  const url = `https://crudcrud.com/api/178e56e6842943d4a2cc40d8ef34f7b9`;


  const handleAddToCart = async (item, quantity) => {
  //  console.log("quantity", quantity);
    const existingCartItem = cartCtx.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    console.log("existingCartItem:", existingCartItem);
    if (existingCartItem) {
      const updatedCartItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + parseInt(quantity),
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
            quantity: +updatedCartItem.quantity,
          }),
        });
        cartCtx.fetchCartItems();
        // ctx.updateTotalQuantity(item);
      } catch (error) {
        console.error("Error updating quantity in the backend:", error);
      }
    } else {
      console.log("add");
      // console.log("quantity", quantity);
      cartCtx.addToCart(item, quantity);
      // ctx.updateTotalQuantity(item);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Candy List</h2>
      {ctx.items.length === 0 && (
        <p style={{ textAlign: "center" }}>No candies in Stock.</p>
      )}
      {ctx.items.length > 0 && (
        <div className="Candy-list">
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
                      onClick={async() => {
                        await handleAddToCart(item, 1);
                        ctx.handleTotalQuantity(item, 1);
                      }}
                    >
                      Buy 1
                    </Button>{" "}
                    <Button
                      variant="success"
                      onClick={async() => {
                        await handleAddToCart(item, 2);
                        ctx.handleTotalQuantity(item, 2);
                      }}
                    >
                      Buy 2
                    </Button>{" "}
                    <Button
                      variant="success"
                      onClick={async () => {
                        await handleAddToCart(item, 3);
                        ctx.handleTotalQuantity(item, 3);
                      }}
                    >
                      Buy 3
                    </Button>
                    {/* <Button
                      variant="success"
                      onClick={() => {
                        handleAddToCart(item);
                        ctx.handleTotalQuantity(item);
                      }}
                    >
                      Add to Cart
                    </Button> */}
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

export default CandyList;
