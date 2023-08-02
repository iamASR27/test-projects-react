import React from "react";
import styles from "./Button.module.css";

const Button = (props) => {
  const buttonClasses = `${styles.button} ${props.className}`;
  return (
    <button
      type={props.type || "button"}
      className={buttonClasses}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
