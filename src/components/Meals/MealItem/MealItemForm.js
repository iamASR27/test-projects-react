import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";


const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
    // const amountInput = event.target.elements["amount_" + props.id];
    // const amount = +amountInput.value;

    // if (amount > 0) {
    //   const itemToAdd = {
    //     id: props.id,
    //     name: props.name,
    //     amount: amount,
    //     price: props.price,
    //   };
    //   ctx.addItem(itemToAdd);
    // }

    // amountInput.value = "1";
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
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
      {!amountIsValid && <p>Please enter a valid amount!</p>}
    </form>
  );
};

export default MealItemForm;
