import React from "react";
import styles from "./Button.module.css";

function Button({ children, className, onClick, type, disable }) {
  return (
    <button
      type={type}
      disabled={disable}
      onClick={onClick}
      className={className ? `${className} ${styles.btn}` : styles.btn}
    >
      {children}
    </button>
  );
}

export default Button;
