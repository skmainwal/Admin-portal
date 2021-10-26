import React, { useEffect } from "react";
import styles from "./Input.module.css";
const Input = (props) => {
  useEffect(() => {
    if (props.checked) {
      props.dependencyHandler(null);
    }
  }, []);

  return (
    <input
      type={props.type}
      id={props.Id}
      value={props.Value}
      placeholder={props.placeholder}
      onChange={(event) => props.onChangeHandler(event)}
      className={styles.input}
      readOnly={props.readOnly}
    />
  );
};

export default Input;
