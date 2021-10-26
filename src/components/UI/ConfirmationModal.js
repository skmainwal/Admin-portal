import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import styles from "./ConfirmationModal.module.css";
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={styles.pop_modal}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.mainContent}>
        <h4>{props.message}</h4>
      </Modal.Body>
      <Modal.Footer className={styles.confirmation_button}>
        <Button
          variant="contained"
          color="primary"
          onClick={props.onDeleteHandler}
          disableElevation
          className={styles.button}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={props.onHide}
          disableElevation
          className={styles.button}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const ConfirmationModal = (props) => {
  //   const [modalShow, setModalShow] = useState(true);
  return (
    <MyVerticallyCenteredModal
      show={props.modalShow}
      onHide={() => props.setModalShow(false)}
      onDeleteHandler={props.onDeleteHandler}
      message={props.message}
    />
  );
};

export default ConfirmationModal;
