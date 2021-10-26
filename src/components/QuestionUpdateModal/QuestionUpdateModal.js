import React from "react";
import ResponseOptions from "../ReponseOptions/ResponseOptions";
import SectionDetails from "../SectionDetails/SectionDetails";
import NewQuestion from "../NewQuestion/NewQuestion";
import styles from "./QuestionUpdateModal.module.css";
import Modal from "../UI/Modal";
const QuestionUpdateModal = () => {
  return (
    <Modal zIndex="100">
      <div className={styles.questionUpdateModal}>
        <div className={styles.questionUpdateModal__left}>
          <NewQuestion />
        </div>
        <div className={styles.questionUpdateModal__right}>
          <SectionDetails />
          <ResponseOptions />
        </div>
      </div>
    </Modal>
  );
};

export default QuestionUpdateModal;
