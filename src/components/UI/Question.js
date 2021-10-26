import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmationModal from "../UI/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { errorHandlerFunc } from "../../store/action";
import { deleteSection } from "../../api_requests/ApiRequests";
import styles from "./Question.module.css";

const Question = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  // const { question_id } = props.question;
  const ErrorHandler = (Error) => {
    dispatch(
      errorHandlerFunc({
        ...Error,
      })
    );
  };
  const deleteConfirmationHandler = () => {
    setModalShow(true);
  };

  const deleteHandler = async () => {
    let response = await deleteSection(
      props.question_id,
      props.in_language,
      ErrorHandler
    );
    if (response === "Error") {
      return;
    }
    console.log("Respone", response);
    let filteredQuestionList = props.questionList.filter(
      (question) => props.question_id != question.question_id
    );
    props.questionListHandler(filteredQuestionList);
    console.log("filteredQuestionList", filteredQuestionList);
  };

  const edithandler = () => {
    const { in_language, question_id, response_type, response_options } =
      props.questionDetails;
    props.setQuestionDetail({
      in_language,
      question_id,
      response_type,
      response_options,
    });
  };
  return (
    <Fragment>
      <ConfirmationModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        onDeleteHandler={deleteHandler}
        message="Are you want to delete the section ?"
      />
      <div className={styles.question}>
        <div className={styles.question__details}>
          <p className={styles.question__data}>{props.question_id} </p>
          <p className={styles.question__data}>{props.question}</p>
        </div>
        <div className={styles.buttons}>
          <Button
            variant="contained"
            color="primary"
            className={styles.button}
            startIcon={<EditIcon />}
            onClick={edithandler}
          >
            Edit
          </Button>
          <Button
            onClick={deleteConfirmationHandler}
            variant="contained"
            color="secondary"
            className={styles.button}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default Question;
