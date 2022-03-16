import React, { forwardRef } from "react";
import styles from "./Form.module.css";

const Form = forwardRef((props, ref) => {
  return (
    <form className={`${styles.form} ${props.className}`}>
      <textarea
        placeholder={props.placeholder}
        value={props.value}
        className={styles["form-input"]}
        onChange={props.onChange}
        ref={ref}
      />
      {props.children}
    </form>
  );
});
export default Form;
