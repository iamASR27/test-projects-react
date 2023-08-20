import React, { useRef, useState } from "react";
import Input from "../UI/Input";
import styles from "./AddShirtForm.module.css";

const AddShirtForm = ({ shirt, onAddToCart }) => {
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

    // const newSizeCount = { ...cartCtx.sizes };
    // newSizeCount[shirt.size] += enteredAmountNumber;
    // const newTotalAmount =
    //   cartCtx.totalAmount + shirt.price * enteredAmountNumber;

    onAddToCart(enteredAmountNumber, shirt);
    // onAddToCart(enteredAmountNumber, {
    //   ...shirt,
    //   size: shirt.size,
    //   amount: enteredAmountNumber,
    // });

    // cartCtx.addItems(
    //   { ...shirt, size: shirt.size, amount: enteredAmountNumber },
    //   newSizeCount,
    //   newTotalAmount
    // );

    // cartCtx.dispatchCartAction({
    //   type: "ADD",
    //   item: { ...shirt, size: shirt.size, amount: enteredAmountNumber },
    //   newSizeCount,
    //   newTotalAmount,
    // });
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + shirt.id,
          type: "number",
          min: "1",
          max: "3",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {!amountIsValid && <p>Please enter a valid amount!</p>}
    </form>
  );
};

export default AddShirtForm;
