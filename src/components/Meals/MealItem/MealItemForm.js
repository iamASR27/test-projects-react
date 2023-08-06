import React, { useContext } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";
import CartContext from "../../../store/cart-context";

const MealItemForm = (props) => {
  const ctx = useContext(CartContext);
  const submitHandler = (event) => {
    event.preventDefault();
    const amountInput = event.target.elements["amount_" + props.id];
    const amount = +amountInput.value;

    if (amount > 0) {
      const itemToAdd = {
        id: props.id,
        name: props.name,
        amount: amount,
        price: props.price,
      };
      ctx.addItem(itemToAdd);
    }

    amountInput.value = "1";
  
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
    </form>
  );
};

export default MealItemForm;
