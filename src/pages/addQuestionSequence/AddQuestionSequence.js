import React, { useState, useCallback, useEffect } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import QuestionSequence from "../../components/QuestionSequence/QuestionSequence";
import { addQuestionSequence } from "../../api_requests/ApiRequests";
import { useDispatch } from "react-redux";
import { errorHandlerFunc } from "../../store/action";
import { useHistory } from "react-router";
import useHttp from "../../hooks/use-http";
import styles from "./AddQuestionSequence.module.css";

let URL = "http://localhost:6003/add_question_sequence";
const AddQuestionSequence = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isSaveButtonClicked, setIsSaveButtonClicked] = useState(false);

  console.log("isSaveButtonClicked AddQuestion Sequence", isSaveButtonClicked);

  const [questionSequenceToAdd, setQuestionSequenceToAdd] = useState(null);
  const ErrorHandler = (Error) => {
    dispatch(
      errorHandlerFunc({
        ...Error,
      })
    );
  };

  console.log("questionSequenceToAdd", questionSequenceToAdd);
  const questionSequenceToAddHandler = (questionSequence) => {
    setQuestionSequenceToAdd((prevState) => questionSequence);
    // console.log("questionSequenceToAdd", questionSequence);
  };

  const addQuestionSequenceHandler = async () => {
    console.log("To Send questionSequenceToAdd", questionSequenceToAdd);

    if (questionSequenceToAdd === null) {
      ErrorHandler({
        message: "All the fields are required",
        message_type: "info",
      });
      return;
    }

    const {
      dependency_rule,
      is_first_question,
      is_last_question,
      last_question_list,
      next_question,
    } = questionSequenceToAdd;

    if (
      dependency_rule[0] === "" ||
      is_first_question === "" ||
      is_last_question === "" ||
      last_question_list[0] === "" ||
      next_question === ""
    ) {
      // ErrorHandler({
      //   message: "All the fields are required",
      //   message_type: "info",
      // });
      // return;
    }

    let response = await addQuestionSequence(
      questionSequenceToAdd,
      setIsSaveButtonClicked,
      ErrorHandler
    );

    // if (response.trim() === "Ok") {
    //   ErrorHandler({
    //     message: "Successfully added question sequence ",
    //     message_type: "success",
    //   });
    // } else {
    //   ErrorHandler({
    //     message: "Failed to add question sequence ",
    //     message_type: "error",
    //   });
    // }
  };
  // useEffect(() => {
  //   if (isSaveButtonClicked) {
  //     ErrorHandler({
  //       message: "Successfully added question sequence ",
  //       message_type: "success",
  //     });
  //   }
  // }, [isSaveButtonClicked]);

  return (
    <div className={styles.adQuestionSequence}>
      <QuestionSequence
        questionSequenceToAddHandler={questionSequenceToAddHandler}
        isSaveButtonClicked={isSaveButtonClicked}
        setIsSaveButtonClicked={setIsSaveButtonClicked}
      />
      <div className={styles.saveButton}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={addQuestionSequenceHandler}
          className={styles.save}
          startIcon={<SaveIcon />}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddQuestionSequence;
