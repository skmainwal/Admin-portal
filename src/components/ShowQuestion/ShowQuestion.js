import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { errorHandlerFunc } from "../../store/action";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
  deleteQuestionSequence,
} from "../../api_requests/ApiRequests";
import { useLocation } from "react-router";
import styles from "./ShowQuestion.module.css";
import ConfirmationModal from "../UI/ConfirmationModal";
const ShowQuestion = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const ErrorHandler = (Error) => {
    dispatch(
      errorHandlerFunc({
        ...Error,
      })
    );
  };
  // const location = useLocation();
  const path = window.location.hash;
  // console.log("LOCATION", path);

  const deleteConfirmationHandler = () => {
    setModalShow(true);
  };

  const onDeleteHandler = async () => {
    // alert("Delete");
    if (path === "#/update_question_sequence") {
      props.setSelectedRow(props.Id);
      props.setSelectedRow("");
      let response = await deleteQuestionSequence(
        props.lastQuestionAsked,
        props.nextQuestionAsked,
        ErrorHandler
      );
      console.log("response After Delete", response);
      if (response.trim() === "Ok") {
        props.deleteHandler(props.lastQuestionAsked, props.nextQuestionAsked);
      }
      // console.log("props.lastQuestionAsked", props.lastQuestionAsked);
      // console.log("props.nextQuestionAsked", props.nextQuestionAsked);
    } else {
      props.deleteHandler(props.question_id);
    }
  };

  const onEditHandler = () => {
    // console.log("Question", props.question);
    props.setSelectedRow("");
    if (path === "#/update_question_sequence") {
      // console.log("Question Sequence", props.question_sequence);
      props.setSelectedRow(props.Id);
      props.selectedQuestionSequenceHandler(props.question_sequence_details);
      // let response = await deleteQuestionSequence(
      //   last_question_asked,
      //   next_question_asked,
      //   ErrorHandler
      // );
      props.setSelectedQuestionId({
        last_question_asked: props.lastQuestionAsked,
        next_question_asked: props.nextQuestionAsked,
      });
    } else {
      props.setQuestionDetailsToUpdate(props.question_details);
      props.setSelectedRow(props.Id);
      props.showUpdateModalHandler(true);
    }
  };
  const ShowingTheDataBasedOnTheActiveButton = () => {
    return (
      <Fragment>
        {path === "#/update_question_sequence" ? (
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            <p className={styles.questionId}>{props.lastQuestionAsked}</p>
            <p>{props.nextQuestionAsked}</p>{" "}
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            {" "}
            <p className={styles.questionId}>{props.question_id}</p>
            <p>{props.question}</p>
          </div>
        )}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <ConfirmationModal
        modalShow={modalShow}
        setModalShow={setModalShow}
        onDeleteHandler={onDeleteHandler}
        message="Are you want to delete the question ?"
      />
      <div
        className={styles.showQuestion}
        style={{
          backgroundColor: props.selectedRow === props.Id ? "#EEEEEE" : "",
        }}
      >
        <div className={styles.showQuestion__question}>
          <ShowingTheDataBasedOnTheActiveButton />
        </div>
        <div className={styles.showQuestion__editAndDeleteButton}>
          <Button
            variant="contained"
            color="primary"
            //   className={classes.button}
            startIcon={<EditIcon />}
            onClick={onEditHandler}
          >
            Edit
          </Button>
          <Button
            onClick={deleteConfirmationHandler}
            variant="contained"
            color="secondary"
            //   className={classes.button}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default ShowQuestion;
