import React from "react";
import styles from "./Modal.module.css";
const Modal = (props) => {
  return (
    <div
      className={styles.modal}
      style={{
        height: props.height,
        width: props.width,
        padding: props.padding,
        zIndex:props.zIndex
      }}
    >
      {props.children}
    </div>
  );
};

export default Modal;
